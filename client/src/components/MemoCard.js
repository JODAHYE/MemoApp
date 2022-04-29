import React, { useState } from "react";
import styled from "styled-components";
import MemoDetailPopup from "./MemoDetailPopup";
const MemoCard = ({ memo }) => {
  const [isDetailClick, setIsDetailClick] = useState(false);

  return (
    <>
      <Wrap color={memo.color}>
        <Label>{memo.title}</Label>
        <SeeDetailBtn
          onClick={() => {
            setIsDetailClick(true);
          }}
        >
          <Icon src="../../img/doc.svg" />
        </SeeDetailBtn>
        <Content>{memo.content}</Content>
        <Date>{memo.date.substring(0, 10)}</Date>
      </Wrap>
      {isDetailClick && (
        <MemoDetailPopup setIsDetailClick={setIsDetailClick} memo={memo} />
      )}
    </>
  );
};

export default MemoCard;
const Wrap = styled.div`
  width: 30%;
  margin: 5px;
  height: 290px;
  display: inline-block;
  background: #fff;
  background: ${(props) => props.color};
  box-shadow: 2px 2px 2px 2px #b4b4b5;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  @media (min-width: 320px) and (max-width: 480px) {
    margin: 3px;
    padding: 5px;
    width: 45%;
    height: 208px;
    font-size: 14px;
  }
`;
const Label = styled.p`
  margin: 0;
  width: 96%;
  border-bottom: 1px solid #fff;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 90%;
  }
`;
const SeeDetailBtn = styled.button`
  position: absolute;
  right: 0px;
  top: 4px;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
`;

const Icon = styled.img`
  width: 20px;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 16px;
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
const Content = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 11;
  -webkit-box-orient: vertical;
  line-height: 1.2em;
  height: 13.2em;
  white-space: pre-wrap;
  border-bottom: 1px solid rgba(35, 6, 81, 0.5);

  @media (min-width: 320px) and (max-width: 480px) {
    -webkit-line-clamp: 10;
    height: 12em;
    font-size: 13px;
  }
`;
