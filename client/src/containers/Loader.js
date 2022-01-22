import { memo } from "react";
import styled, { keyframes } from "styled-components";

const scale = keyframes`
  0% {
    transform: scale(0.5);
  }
  50%{
    transform: scale(0.8);
  }
  100% {
    transform: scale(0.5);
  }
`;

const LoaderWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;
const Circle = styled.span`
  background: #727272;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  margin: 10px;
  animation: ${scale} 1s 0.3s infinite linear;
  &: first-child {
    animation-delay: 0s;
  }
  &: last-child {
    animation-delay: 0.6s;
  }
`;
const Loader = () => {
  return (
    <LoaderWrap>
      <Circle />
      <Circle />
      <Circle />
    </LoaderWrap>
  );
};

export default memo(Loader);