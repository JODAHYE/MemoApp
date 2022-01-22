import React, { useEffect } from 'react';
import LoginContainer from './LoginContainer';
import styled from 'styled-components';
import MemoPageContainer from './MemoPageContainer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background: #F0F0F0;
`;
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
      {isLogin ? <MemoPageContainer />:<Wrap><LoginContainer /></Wrap>}
    </>
  );
};

export default MainContainer;