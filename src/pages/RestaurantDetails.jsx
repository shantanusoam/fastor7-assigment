import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { BiSolidOffer } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MdArrowBackIos } from 'react-icons/md';
import { useSelector } from 'react-redux';
import fastorLogo from '../assets/Fastor7.webp';
const Container = styled.div`
  position: relative;
`;
const ImageContainer = styled.div`
  position: absolute;
  z-index: 0;
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
  z-index: 1;
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
const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const restoData = useSelector((state) => state.restaurants);
  let data;
  if (restoData.length) {
    data = restoData;
  } else data = JSON.parse(localStorage.getItem('data'));

  const handleDrag = (e, ui) => {
    const { x, y } = ui;
    setLogoPosition({ x, y });
  };

  const handleShareClick = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const restaurantImg = new Image();
    const logoImg = new Image();

    restaurantImg.src = data[id].images[0].url;
    logoImg.src = fastorLogo;

    restaurantImg.onload = () => {
      ctx.drawImage(restaurantImg, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(logoImg, logoPosition.x, logoPosition.y, 100, 100); // You can adjust the width and height of the logo as per your requirement

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element and trigger a download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'superimposed-image.png';
        a.click();

        // Clean up
        URL.revokeObjectURL(url);
      }, 'image/png');
    };
  };
  return (
    <Container>
      <IconContainter onClick={() => navigate('/restaurants-list')}>
        <MdArrowBackIos />
      </IconContainter>
      <ImageContainer>
        <img
          src={data[id].images[0].url}
          style={{ width: '100%', height: 600 }}
        />
      </ImageContainer>
      <div className="flex flex-col items-center justify-center h-screen">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="mb-4 border"
        />
        <Draggable position={logoPosition} onDrag={handleDrag}>
          <img
            src={fastorLogo}
            alt="Fastor Logo"
            className="absolute cursor-pointer"
          />
        </Draggable>
        <button
          onClick={handleShareClick}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Share Image
        </button>
      </div>
    </Container>
  );
};

export default RestaurantDetails;
