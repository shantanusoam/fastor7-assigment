import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Varification from './Varification';
import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/submit-otp" element={<Varification />} />
      <Route path="/restaurants-list" element={<RestaurantList />} />
      <Route path="/restaurant-details/:id" element={<RestaurantDetails />} />
    </Routes>
  );
}

export default AllRoutes