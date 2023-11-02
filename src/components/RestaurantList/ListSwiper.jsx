import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";

const Card = styled.div`
  height: 12rem;
  margin-left: 0.25rem;
  overflow: hidden;
  border-radius: 1rem;
  font-weight: 600;
  background: ${(props) => props.color};
`;

const SwiperCarousel = () => {
const restoData = useSelector((state) => state.restaurants);
let data;
if (restoData.length) {
  data = restoData;
} else data = JSON.parse(localStorage.getItem("data"));
  console.log("data: ", data);
  let colorArr = [
    "#F9D3D9",
    "#E8FFFF",
    "#E5D9D3",
    "#F9D3D9",
    "#E8FFFF",
    "#E5D9D3",
    "#F9D3D9",
    "#E8FFFF",
    "#E5D9D3",
    "#F9D3D9",
    "#E8FFFF",
    "#E5D9D3",
  ];
  return (
    <div>
      <Swiper
        spaceBetween={12}
        centeredSlides={0}
        // initialSlide=props.initialSlide || 0}
        // navigation={props.navigationButtons}
        // pagination={props.pageDots ? { clickable: true } : false}
        slidesPerView={2.5}
        // modules={[Navigation, Pagination]}
        lazy={true}
      >
        {data.map((e, i) => (
          <SwiperSlide key={i}>
            <Card color={colorArr[i] ? colorArr[i] : "#E8FFFF"}>
              <img src={e.images[0].url} style={{ height: "8rem" }} />
              <div style={{ marginBottom: "0.5rem"  , height : '3.25rem' , display: 'flex' , justifyContent : 'center' , flexDirection : 'column'}}>
                <div
                  style={{
                    fontSize: "0.85rem",
                  }}
                >
                  {e.restaurant_name}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "grey",
                    fontWeight: "500",
                  }}
                >
                  {e.location && e.location.city_name}
                </div>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
