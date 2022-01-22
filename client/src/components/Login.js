import React from 'react';
import {RiKakaoTalkFill} from 'react-icons/ri';
import styled from 'styled-components';
const GoLogin = styled.a`
  text-decoration:none;
  background: #F7E600;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  box-shadow: 2px 2px 2px 2px #B4B4B5;
  &:hover{
    box-shadow: none;
    transform: translate(2px, 2px);
  }
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 20px; 
  }
`;
const Title = styled.span`
  color: #3A1D1D;
  font-size: 18px;
  font-weight: 600;
  margin-left: 8px;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 16px; 
  }
`;
const KakaoIcon = styled(RiKakaoTalkFill)`
  font-size: 60px;
  color: #3A1D1D;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 30px; 
  }
`;
const Login = ({loginUrl}) => {
  return (
    <GoLogin href={loginUrl}><KakaoIcon /><Title>카카오로 시작하기</Title></GoLogin>
    // <a href={loginUrl}><img alt="카카오로그인" src="img/kakao_login_medium_narrow.png" /></a>
  );
};

export default Login;