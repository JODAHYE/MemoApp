import React from 'react';
import styled from 'styled-components';
import {MdOpenInNew} from 'react-icons/md';
const Wrap = styled.div`
  width: 30%;
  margin: 5px;
  height: 290px;
  display: inline-block;
  background: #fff;
  background: ${props=>props.color};
  box-shadow: 2px 2px 2px 2px #B4B4B5;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  @media (min-width: 320px) and (max-width: 480px) {
    margin: 3px;
    padding: 5px;
    width: 48%;
    height: 208px;
    font-size: 14px;
  }
  
`;
const Label = styled.p`
  margin: 0;
  padding: 4px;
  border-bottom: 1px solid #fff;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical; 
  overflow: hidden;
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 2px;
  }
`;
const SeeDetail = styled(MdOpenInNew)`
  position: absolute;
  right: 4px;
  top: 4px;
  font-size: 24px;
  cursor: pointer;
  color: #1D0660;
  &:hover{
    color: #fff;
  }
`;
const Date = styled.p`
  font-size: 12px;
  display: inline;
  margin-right: 12px;
  @media (min-width: 320px) and (max-width: 480px) {
    margin-right: 8px;
  }
`;
const Menu = styled.span`
  margin: 0 2px;
  font-size: 14px;
  cursor: pointer;
  &:hover{
    opacity: 0.5;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 12px;
  }
`;
const Content = styled.div`
  padding: 6px 4px;
  box-sizing: border-box;
  height: 80%;
  overflow: hidden;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical; 
  border-bottom: 1px solid rgba(35, 6, 81, 0.5);
  @media (min-width: 320px) and (max-width: 374px) {
    padding: 3px 2px;
    font-size: 12px;
    -webkit-line-clamp: 8;      
  }
  @media (min-width: 375px) and (max-width: 480px) {
    padding: 3px 2px;
    font-size: 13px;
    -webkit-line-clamp: 10;      
  }  

`;
const MemoCard = ({memo, onDetail, onMemoHandle}) => {
  return (
    <Wrap color={memo.color}>
      <Label>{memo.title}</Label>
      <SeeDetail onClick={onDetail} />
      <Content>{memo.content}</Content>
      <Date>{memo.date.substring(0,10)}</Date>
      <Menu onClick={onMemoHandle}>수정</Menu>
      <Menu onClick={onMemoHandle}>삭제</Menu>
    </Wrap>
  );
};

export default MemoCard;