import React from 'react';
import styled from 'styled-components';
const Wrap = styled.div`
  width: 80%;
  padding: 20px;
  border-bottom: 3px solid #fff;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 2px;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 500;
    background: #F0F0F0;
    border-bottom: 2px solid #fff;
  }
`;
const Button = styled.button`
  border: none;
  background: #1D0660;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  &:hover{
    color: #2F4858;
    background: #fff;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
    padding: 6px;
  }
  @media (min-width: 375px) and (max-width: 480px) {
    font-size: 12px;
    padding: 10px;
  }
`;
const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;
const UserName = styled.p `
  margin-left: 10px;
  margin-right: 300px;
  @media (min-width: 320px) and (max-width: 480px) {
    margin-left: 6px;
    margin-right: 20px;
    font-size: 14px;
  }`;
const Nav = ({onMenuClick, onLogout, user}) => {
  return (
    <Wrap>
      <ProfileImg src={user.profile_image} />
      <UserName>{user.name}님</UserName>
      <Button onClick={onMenuClick}>메모하기</Button>
      <Button onClick={onMenuClick}>내 메모지</Button>
      <Button onClick={onLogout}>로그아웃</Button>
    </Wrap>
  );
};

export default Nav;