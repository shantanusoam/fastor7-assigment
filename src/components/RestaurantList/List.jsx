import React from "react";
import { BiSolidOffer } from "react-icons/bi";
import styled from "styled-components";
import {AiFillStar} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Container = styled.div`
  margin-top: 1rem;
`;
const ListContainer = styled.div``;
const Card = styled.div`
  display: grid;
  grid-template-columns: 7.5rem auto;
  gap: 0.85rem;
  height: 6.5rem;
  margin-bottom: 1.5rem;
  width: 90%;
  margin-inline: auto;
  .img-container {
    overflow: hidden;
    border-radius: 0.75rem;
  }
`;
const DetailsContainer = styled.div`
  text-align: left;
`;
const FlexBox = styled.div`
display : flex;
justify-content : space-between;

`
const List = () => {
  const restoData = useSelector((state) => state.restaurants);
  let data
  if (restoData.length) {
      data = restoData
  }
  else
    data = JSON.parse(localStorage.getItem("data"));
const navigate = useNavigate()
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
        Popular Ones
      </div>

      <ListContainer>
        {data.map((e, i) => (
          <Card onClick={() => navigate("/restaurant-details/" + i)}>
            <div className="img-container">
              <img src={e.images[0].url} style={{ height: "7rem" }} />
            </div>
            <DetailsContainer>
              <div
                style={{
                  fontWeight: 600,
                  marginBottom: "0.25rem",
                  fontSize: "1rem",
                }}
              >
                {e.restaurant_name}
              </div>
              <div
                style={{ fontWeight: 400, color: "grey", fontSize: "0.75rem" }}
              >
                {e.address_complete && e.address_complete != "null"
                  ? e.address_complete
                  : e.location && e.location.location_address_2
                  ? e.location.location_address_2
                  : ""}
              </div>
              <div
                style={{
                  gap: "0.15rem",
                  marginBlock: "0.35rem",
                  fontWeight: "500",
                  color: "#D3906F",
                  fontSize: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <BiSolidOffer /> 4 Offers trending
              </div>

              <FlexBox>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.15rem",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    <AiFillStar />{" "}
                    <div style={{ marginTop: "0.15rem" }}>
                      {e.rating.restaurant_avg_rating}
                    </div>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "grey" }}>
                    Popularity
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", fontWeight: "600" }}>
                    $ 200
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "grey" }}>
                    Cost for two
                  </div>
                </div>
              </FlexBox>
            </DetailsContainer>
          </Card>
        ))}
      </ListContainer>
    </Container>
  );
};

export default List;
