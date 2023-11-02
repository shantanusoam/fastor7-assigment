import React from "react";
import RestaurantHeader from "../components/RestaurantList/RestaurantHeader";
import ListCarousal from "../components/RestaurantList/ListCarousal";
import styled from "styled-components";
import List from "../components/RestaurantList/List";

const RestaurantList = () => {
  return (
    <>
      <RestaurantHeader />
      <ListCarousal />
      <List />
    </>
  );
};

export default RestaurantList;
