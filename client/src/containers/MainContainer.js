import React, { useEffect } from 'react';
import LoginContainer from './LoginContainer';
import styled from 'styled-components';
import MemoPageContainer from './MemoPageContainer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../font.css';
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.h2`
  color: #000;
  background: url('img/main.png') center center / cover no-repeat;
  background-size: 500px;
  width: 30%;
  height: 30%;
  font-family: 'Ubuntu', sans-serif;
  text-align: center;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 80%;
    height: 35%;
    font-weight: 400;  
  }
`
const MainContainer = () => {
  const navigate = useNavigate();
  const {isLogin} = useSelector(state=>state.user); 
  useEffect(()=>{
    const code = new URL(window.location.href).searchParams.get("code");
    if(isLogin){
      navigate('/');
    }
  },[isLogin])
  return (
    <>
      {isLogin ? <MemoPageContainer />:<Wrap><Title>ColorIt</Title><LoginContainer /></Wrap>}
    </>
  );
};

export default MainContainer;