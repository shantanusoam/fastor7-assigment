import React, { useState } from "react";
import { Button, Container, Header } from "./Login";
import OTPInput from "react-otp-input";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
const IconContainter = styled.div`
  position: fixed;
  z-index: 1;
  color: black;
  font-size: 1.5rem;
  top: 2rem;
  left: 1.5rem;
  border : 1px solid grey;
  border-radius : 0.5rem;
  height : 3rem;
  width : 2rem;
  display : flex;
  jusitify-content : center;
  align-items : center;
  padding-left : 1rem;  
`;
const OtpContainer = styled.div`
  width: 90%;
  div {
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr !important;
    gap: 0.8rem;
  }
  .otpBox {
    width: 100% !important;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    height: 3rem;
    background: #f7f8f9;

    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  }
`;
const Text = styled.div`
  b {
    color: #6a85cd;
    cursor: pointer;
  }
`;
const Varification = () => {
  const [otp, setOtp] = useState("");
  const userDetails = useSelector((state) => state.user_info);
  const restaurantData = useSelector((state) => state.restaurants);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleOtpChange = (OTP) => {
    setOtp(OTP);
  };

  function _searchRestaurants(token , navigate) {
    axios
      .get("https://staging.fastor.in/v1/m/restaurant?city_id=118", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        dispatch({ type: "ADD_DATA", payload: res.data });
        localStorage.setItem('data' , JSON.stringify(res.data))
        navigate()
        
      })
      .catch((e) => console.log(e));
    // https://staging.fastor.in/v1/m/restaurant?city_id=118
  }
  function navigateRestaurants() {
        navigate("/restaurants-list");
  
}
  function handleSubmit(e) {
    e.preventDefault();
    toast.dismiss();
    if (otp.length != 6) {
      setOtp("");
      return toast.error("Please enter valid otp");
    }

    let body = new URLSearchParams();
    body.append("phone", userDetails.phone);
    body.append("dial_code", userDetails.dial_code);
    body.append("otp", otp);

    axios
      .post("https://staging.fastor.in/v1/pwa/user/login", body)
      .then((res) => {
        toast.success("Login successful");
        dispatch({
          type: "ADD_TOKEN",
          payload: { token: res.data.data.token },
        });
        _searchRestaurants(res.data.data.token, navigateRestaurants);
      })
      .catch((e) =>
        toast.error("Something went wrong! Please try again later.")
      );
  }

  return (
    <Container>
      <IconContainter onClick={() => navigate("/")}>
        <MdArrowBackIos />
      </IconContainter>
      <Header>
        <div className="heading">OTP Verification</div>
        <div>
          Enter the verification code we just sent on your Mobile Number
        </div>
      </Header>
      <OtpContainer>
        <OTPInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          inputType="tel"
          inputStyle="otpBox"
          // renderSeparator={<span> </span>}
          renderInput={(props) => <input {...props} />}
        />
      </OtpContainer>
      <Button onClick={handleSubmit}>Verify</Button>

      <Text onClick={() => setOtp("")}>
        Didn't received code? <b>Resend</b>
      </Text>
    </Container>
  );
};

export default Varification;
