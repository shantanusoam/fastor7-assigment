import React from 'react'
import styled from 'styled-components'
import {IoMdWallet} from 'react-icons/io'
import {BiSolidOffer} from 'react-icons/bi'
const Container = styled.div`

`
const Header = styled.div`
  text-align: left;
  padding: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  color: #b9b9b9;
font-size : 0.7rem;
  b {
    display: block;
    font-size : 0.85rem;
    color : black;
  }
`;
const FlexContainer = styled.div`
  display : grid;
  grid-template-columns : 1fr 1fr;
  gap : 0.5rem;
  margin-top : 0.5rem;
`;
const NameContainer = styled.div`
  background: #fafafa;
  font-weight: 700;
  font-size: 0.85rem;
  text-align: left;
  border-radius: 0rem 0rem 1rem 1rem;
  padding: 1rem;
  .name {
    color: #b9b9b9;
    margin-bottom : 0.25rem;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;
const OfferContainer = styled.div`
  .icon {
    border-radius: 1rem;
    padding: 1rem;
    margin-bottom : 0.15rem;
  }
  color: #b9b9b9;
  font-size : 0.85rem;
`;
const RestaurantHeader = () => {

  return (
    <Container>
      <Header>
        Pre order from
        <b>Saffron, Ahmedabad</b>
      </Header>
      <FlexContainer>
        <NameContainer>
          <div className="name">Karan</div>
          <div>Let's explore this evening</div>
        </NameContainer>
        <FlexContainer style={{marginInline : '0.5rem'}}>
          <OfferContainer>
            <div
              className="icon"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,117,117,1) 0%, rgba(255,161,171,1) 100%, rgba(0,212,255,0) 100%, rgba(9,9,121,0) 100%)",
              }}
            >
              <BiSolidOffer style={{ fontSize: "2.5rem", color: "white" }} />
            </div>
            Offers
          </OfferContainer>
          <OfferContainer>
            <OfferContainer>
              <div
                className="icon"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(125,135,255,1) 0%, rgba(118,125,255,1) 0%, rgba(24,41,255,1) 100%, rgba(63,138,153,0) 100%, rgba(9,9,121,0) 100%)",
                }}
              >
                <IoMdWallet style={{ color: "white", fontSize: "2.5rem" }} />{" "}
              </div>
              Wallet
            </OfferContainer>
          </OfferContainer>

          {/* <IoMdWallet style={{color : 'green'}} /> */}
        </FlexContainer>
      </FlexContainer>
    </Container>
  );
}

export default RestaurantHeader