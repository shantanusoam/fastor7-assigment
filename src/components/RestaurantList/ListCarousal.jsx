import React from 'react'
import styled from 'styled-components'
import ListSwiper from './ListSwiper';
import OffersSwiper from './OffersSwiper'
const Container = styled.div`

`
const ListCarousal = () => {
  return (
    <Container>
      <div
        style={{
          fontSize: "1.1rem",
          padding: "1rem",
          fontWeight: "600",
          textAlign: "left",
        }}
      >
        Your taste
      </div>
          <ListSwiper />
          <OffersSwiper />
    </Container>
  );
}

export default ListCarousal