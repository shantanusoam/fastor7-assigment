import React, { useRef } from "react";
import { styled } from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
export const Button = styled.button`
  width: 80%;
  height: 2.8rem;
  width: 89.5%;
  border-radius: 0.5rem;
  border: 1px solid #ff6d6a;
  background: #ff6d6a;
  font-size: 0.9rem;
  font-weight: 500;
  color: white;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  align-items : center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 1.5rem;
`;
export const Header = styled.div`
  color: #b9b9b9;
  font-size: 0.85rem;
  font-weight: 400;
  .heading {
    font-size: 1.3rem;
    font-weight: 700;
    color: black;
    margin-bottom: 0.25rem;
  }
`;
const Form = styled.form``;
const InputBox = styled.input`
  height: 2.8rem;
  width: 80%;
  border-radius: 0.5rem;
  border: 1px solid #dadada;
  background: #f7f8f9;
  padding-inline: 1rem;
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const Login = () => {
    let mobileRef = useRef();
    const dispatch = useDispatch()
    const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault();
    toast.dismiss();
    if (mobileRef.current.value.length !== 10)
      return toast.error("Please enter valid mobile number");

    let body = new URLSearchParams();
    body.append("phone", mobileRef.current.value);
    body.append("dial_code", "+91");

    axios
      .post("https://staging.fastor.in/v1/pwa/user/register", body)
        .then((res) => {
            toast.success("OTP has been sent to mobile number")
            dispatch({type : 'ADD_NUMBER' ,payload :  { phone: mobileRef.current.value, dial_code: '+91' }});
            navigate("/submit-otp");
        })
        .catch((e) =>
          {console.log(e)
        toast.error("Something went wrong! Please try again later.")}
      );
  }

  return (
    <Container>
      <Header>
        <div className="heading">Enter Your Mobile Number</div>
        <div>We will send you the 6 digit verification code</div>
      </Header>
      <Form>
        <InputBox
          placeholder="Enter your mobile number"
          type="tel"
          maxLength="10"
          ref={mobileRef}
        />
        <Button onClick={handleSubmit}>Send Code</Button>
      </Form>
    </Container>
  );
};

export default Login;
