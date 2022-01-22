import React from 'react';
import styled from 'styled-components';
import {FaPaintBrush} from 'react-icons/fa';
const Wrap = styled.div`
  width: 30%;
  margin: 5px;
  height: 296px;
  display: inline-block;
  background: ${props=>props.color};
  box-shadow: 2px 2px 2px 2px #676767;
  overflow: hidden;
  @media (min-width: 320px) and (max-width: 480px) {
    margin: 3px;
    width: 48%;
    height: 208px;
    font-size: 14px;
  }
`;
const OptionColor = styled(FaPaintBrush)`
  display: inline-block;
  font-size: 18px;
  cursor: pointer;
  color: #fff;
  &:hover{
    opacity: 0.5;
  }
`;
const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props=>props.color};
`;
const Title = styled.input`
  display: inline-block;
  margin: 5px 5px 0;
  border: none;
  outline: none;
  width: 90%;  
  font-size: 16px;
  height: 10%;
  background: transparent;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 14px;
  }
`;
const Content = styled.textarea`
  border: none;
  outline: none;
  width: 90%;  
  height: 80%;
  border-top: 1px solid #fff;
  background: transparent;
  -ms-overflow-style: none;
  scrollbar-width: none; 
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Btn = styled.input`
  border: none;
  background: #B0AB99;
  color: #fff;
  cursor: pointer;
  &:hover{
    color: #000;
    background: #fff;
  }
`;
const RowBox = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 70%;
  }
`; 
const SelectBox = styled.select`
  outline: none;
  width: 70%;
`;
const FolderSelect = styled.option`
  font-size: 12px;
`;
const MemoUpdate = ({onSelect, folders, optionColor, title, onChangeTitle, onChangeContent, 
  content, onOptionClick, onSubmit}) => {
  return (
    <Wrap color={optionColor}>
      <Form color={optionColor}>
        <Title type="text" placeholder="제목을 입력하세요" value={title} onChange={onChangeTitle} />
        <SelectBox onChange={onSelect}>
            <FolderSelect>변경안함</FolderSelect>
            {folders.map((v, i)=><FolderSelect key={i} value={v}>{v}</FolderSelect>)}
        </SelectBox>
        <Content placeholder="내용" value={content} onChange={onChangeContent} />
        <RowBox>
          <OptionColor onClick={onOptionClick} />
          <Btn type="submit" value="완료" onClick={onSubmit} />
          <Btn type="submit" value="취소" onClick={onSubmit} />
        </RowBox>        
      </Form>
    </Wrap>
  );
};

export default MemoUpdate;