import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import MemoPage from "./MemoPage";
import Login from "./Login";

const Main = () => {
  const { isLogin } = useSelector((state) => state.user);

  return <Wrap>{isLogin ? <MemoPage /> : <Login />}</Wrap>;
};

export default Main;

const Wrap = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
`;
