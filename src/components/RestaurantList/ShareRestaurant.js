import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { BiSolidOffer } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MdArrowBackIos } from 'react-icons/md';
import { useSelector } from 'react-redux';
import fastorLogo from '../../assets/Fastor7.webp';

import { useWindowSize } from '../../hooks/useWindowSize';
const Container = styled.div`
  position: relative;
`;
const ImageContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 95vh;
  z-index: -20;
`;
const DetailsContainer = styled.div`
  position: absolute;
  z-index: 1;
  background: white;
  top: 22rem;
  width: 90vw;
  border-radius: 2rem;
  padding: 5vw;
  text-align: left;
`;
const IconContainter = styled.div`
  position: absolute;
  z-index: 90;
  color: white;
  font-size: 1.5rem;
  top: 1rem;
  left: 1rem;
`;
const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;

const ShareRestaurant = ({ setIsOpen }) => {
  const { width, height } = useWindowSize();
  const [imageDimensions, setImageDimensions] = useState({
    width: 200,
    height: 21.48,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const restoData = useSelector((state) => state.restaurants);
  let data;
  const canvasWidth = width / 1.2; // Set the width of the canvas
  const canvasHeight = height - 200; // Set the height of the canvas
  const maxX = canvasWidth - imageDimensions.width; // Subtract the width of the logo from the canvas width
  const maxY = canvasHeight - imageDimensions.height; // Subtract the height of the logo from the canvas height
  if (restoData.length) {
    data = restoData;
  } else data = JSON.parse(localStorage.getItem('data'));

  const handleDrag = (e, ui) => {
    const { x, y } = ui;
    setLogoPosition({ x, y });
  };

  // useEffect(() => {
  //   let timeoutId;

  //   const updateImageDimensions = () => {
  //     // Calculate desired width and height based on window dimensions
  //     const windowWidth = width;
  //     const windowHeight = height;

  //     const aspectRatio = imageDimensions.width / imageDimensions.height;

  //     // Calculate new dimensions while maintaining the aspect ratio
  //     let newWidth, newHeight;
  //     if (windowWidth / windowHeight > aspectRatio) {
  //       newWidth = windowWidth;
  //       newHeight = windowWidth / aspectRatio;
  //     } else {
  //       newHeight = windowHeight;
  //       newWidth = windowHeight * aspectRatio;
  //     }

  //     // Update image dimensions
  //     setImageDimensions({ width: newWidth, height: newHeight });
  //   };

  //   // Debounce the function to prevent too many re-renders
  //   const handleResize = () => {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       updateImageDimensions();
  //     }, 200); // Adjust the debounce delay (in milliseconds) as needed
  //   };

  //   // Add event listener to update dimensions when the window is resized
  //   window.addEventListener('resize', handleResize);

  //   // Initial calculation of dimensions
  //   updateImageDimensions();

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  const handleShareClick = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const restaurantImg = new Image();
    restaurantImg.crossOrigin = 'anonymous';
    const logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';

    restaurantImg.src = data[id].images[0].url;
    logoImg.src = fastorLogo;

    restaurantImg.onload = () => {
      ctx.drawImage(restaurantImg, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        logoImg,
        logoPosition.x,
        logoPosition.y,
        imageDimensions.width,
        imageDimensions.height
      ); // You can adjust the width and height of the logo as per your requirement

      if (navigator.share) {
        canvas.toBlob((blob) => {
          const file = new File([blob], 'superimposed-image.png', {
            type: 'image/png',
          });
          const shareData = {
            title: 'Superimposed Image',
            text: 'f out this image!',
            files: [file],
          };
          navigator
            .share(shareData)
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.error('Error sharing:', error));
        }, 'image/png');
        setIsOpen(false);
      } else {
        //download it if not able to share
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);

          // Create a temporary anchor element and trigger a download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'superimposed-image.png';
          a.click();
          setIsOpen(false);
          // Clean up
          URL.revokeObjectURL(url);
        }, 'image/png');
        console.error('Web Share API is not supported.');
      }
    };
  };

  return (
    <div className=" relative ">
      <Draggable
        className="absolute z-20"
        position={logoPosition}
        onDrag={handleDrag}
        bounds={{ left: 0, top: 0, right: maxX, bottom: maxY }}
      >
        <img
          crossOrigin="anonymous"
          src={fastorLogo}
          alt="Fastor Logo"
          width={imageDimensions.width}
          height={imageDimensions.height}
          className="absolute cursor-pointer"
        />
      </Draggable>
      <ImageContainer>
        <img
          src={data[id].images[0].url}
          style={{ width: canvasWidth, height: canvasHeight }}
        />
      </ImageContainer>
      <IconContainter onClick={() => setIsOpen(false)}>
        <MdArrowBackIos />
      </IconContainter>
      <canvas
        crossOrigin="anonymous"
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="mb-4 border"
      />

      <button
        onClick={handleShareClick}
        className="mt-4 mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        Share Image
      </button>
    </div>
  );
};

export default ShareRestaurant;
