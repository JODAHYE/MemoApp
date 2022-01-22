import React from 'react';
import styled from 'styled-components';
const Wrap = styled.div`
  width: 30vw;
  height: 50vh;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 25px;
  overflow-y: auto;
  box-sizing: border-box;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 80vw;
  }
`;
const CloseBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
  &:hover{
    transform: scale(1.5);
  }
`;
const Title = styled.p`
  border-bottom: 1px solid #eee;
  font-size: 22px;  
  margin: 0;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 18px;  
  }
`;
const Date = styled.p`
  border-bottom: 1px solid #eee;
  padding: : 25px 0;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 14px;  
  }
`;
const Content = styled.p`
  margin: 0;
  white-space: pre-wrap;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 14px;  
  }
`;
const MemoDetail = ({post, onClose}) => {
  return (
      <Wrap>
        <CloseBtn onClick={onClose} >X</CloseBtn>
        <Title>{post.title}</Title>
        <Date>{post.date.substring(0,10)}</Date>
        <Content>{post.content}</Content>
      </Wrap>
  );
};

export default MemoDetail;