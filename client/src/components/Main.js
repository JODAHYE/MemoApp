import React from "react";
import MemoPage from "./MemoPage";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Login from "./Login";

const Main = () => {
  const { isLogin } = useSelector((state) => state.user);
  return <Wrap>{isLogin ? <MemoPage /> : <Login />}</Wrap>;
};

export default Main;
const Wrap = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
