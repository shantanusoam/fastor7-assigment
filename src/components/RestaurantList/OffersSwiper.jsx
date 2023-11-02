import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";

const Card = styled.div`
  height: 10rem;
  margin-inline: 0.25rem;
  overflow: hidden;
  border-radius: 1rem;
  font-weight: 600;
  background: ${(props) => props.color};
`;

const SwiperCarousel = () => {
    const data = [
      "https://www.sizzlingpubs.co.uk/content/dam/sizzling-pubs/images/2022/refresh/offers/offers-banner.jpg.asset/1686315411067.jpg",
      "https://d4t7t8y8xqo0t.cloudfront.net/resized/1080X400/pages%2F493%2Fimage20180417111926.jpg",
      "https://blog.dineout-cdn.co.in/blog/wp-content/uploads/2021/03/17-march-BB-2.jpg",
      "https://www.icicibank.com/content/dam/icicibank/india/managed-assets/images/offer-zone/credit-debit-card/ibc-offer-d.jpg",
      "https://www.icicibank.com/content/dam/icicibank/india/managed-assets/images/offer-zone/debit-card/Qmin-offer-d.jpg",
    ];
  return (
    <div style={{marginTop : '1.5rem'}}>
      <Swiper
        spaceBetween={12}
        centeredSlides={0}
        // initialSlide=props.initialSlide || 0}
        // navigation={props.navigationButtons}
        pagination={{ clickable: true }}
        slidesPerView={1}
        lazy={true}
      >
        {data.map((e, i) => (
          <SwiperSlide key={i}>
            <Card>
             <img style={{height : '10rem'}} src={e} />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
