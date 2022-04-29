import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import SignupPopup from "./SignupPopup";
import { login } from "../modules/user";
import { customColor } from "../style/theme";

const Login = () => {
  const dispatch = useDispatch();

  const [onSignup, setOnSignup] = useState(false);
  const [info, setInfo] = useState({
    id: "",
    password: "",
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(login(info));
    },
    [info]
  );

  const onChange = useCallback(
    (e) => {
      setInfo({ ...info, [e.target.name]: e.target.value });
    },
    [info]
  );

  return (
    <Wrap>
      <LogoImg src="../../img/logo.png" />
      <Form onSubmit={onSubmit}>
        <Input type="text" name="id" placeholder="id" onChange={onChange} />
        <Input
          type="password"
          name="password"
          placeholder="password"
          onChange={onChange}
        />
        <LoginBtn>Login</LoginBtn>
      </Form>
      <p>Don't have an account?</p>
      <SignupBtn
        onClick={() => {
          setOnSignup(true);
        }}
      >
        Sign up
      </SignupBtn>
      {onSignup && <SignupPopup setOnSignup={setOnSignup} />}
    </Wrap>
  );
};

export default Login;

const Wrap = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 1px 1px 4px 4px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 86%;
    height: auto;
    & > p {
      font-size: 12px;
    }
  }
`;

const LogoImg = styled.img`
  width: 100%;
`;

const Form = styled.form`
  width: 100%;
  height: 90%;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #eee;
  padding: 6px;
  background: #ebceaa;
  border-radius: 20px;
  line-height: 2em;
  font-size: 16px;
  display: block;
  outline: none;
  margin-top: 10px;
  box-sizing: border-box;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 14px;
    padding: 2px;
  }
`;

const LoginBtn = styled.button`
  width: 100%;
  line-height: 2em;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 6px;
  padding: 6px;
  font-size: 16px;
  margin-top: 10px;
  background: ${customColor.button};
  &:active {
    background: ${customColor.buttonActive};
  }
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 14px;
    padding: 2px;
  }
`;

const SignupBtn = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  font-size: 14px;
  background: ${customColor.button};
  &:active {
    background: ${customColor.buttonActive};
  }
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`;
