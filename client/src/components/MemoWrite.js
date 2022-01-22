import React from 'react';
import styled from 'styled-components';
import {RiCloseCircleFill} from 'react-icons/ri';
const Wrap = styled.div`
  width: 600px;
  height: 600px;
  box-shadow: 2px 2px 2px 2px #9D9D9B;
  background: #eee;
  overflow: hidden;
  margin: 0 auto;
  @media (min-width: 320px) and (max-width: 374px) {
    width: 100%;
    height: 60vh;
  }
  @media (min-width: 375px) and (max-width: 480px) {
    width: 88%;
    height: 60vh;
  }
`;
const Option = styled.div`
  width: 100%;
  height: 10%;
  background: ${props=>props.color};
  display: flex; 
  align-items: center;
  position: relative;
`;
const OptionColor = styled.span`
  margin: 0 10px;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props=>props.color};
  cursor: pointer;
  &:hover{
    opacity: 0.5;
  }
  @media (min-width: 375px) and (max-width: 480px) {
    margin: 0 2px;
  }
`;
const OptionBasic = styled(RiCloseCircleFill)`
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
  margin: 0 10px;
  &:hover{
    opacity: 0.5;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    margin: 0 2px;
  }
`;
const SelectBox = styled.select`
  outline: none;
  padding: 5px;
  font-size: 16px;
  position: absolute;
  right: 10px;
  @media (min-width: 320px) and (max-width: 480px) {
   font-size: 14px;
   width: 50%;
  }
`;
const FolderSelect = styled.option`
  font-size: 16px;
  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 14px;
  }
`;
const Form = styled.form`
  width: 100%;
  height: 80%;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 320px) and (max-width: 480px) {
    height: 84%;
  }
`;
const Title = styled.input`
  border: none;
  outline: none;
  width: 70%;  
  padding: 10px;
  font-size: 16px;
  @media (min-width: 320px) and (max-width: 374px) {
    width: 85%;
    font-size: 14px;
  }
  @media (min-width: 375px) and (max-width: 480px) {
    width: 85%;
  }
`;
const Content = styled.textarea`
  border: none;
  outline: none;
  width: 70%;  
  height: 70%;
  padding: 10px;
  border-top: 1px solid #2F4858;
  @media (min-width: 320px) and (max-width: 374px) {
    width: 85%;
    height: 80%;
    font-size: 14px;
  }
  @media (min-width: 375px) and (max-width: 480px) {
    width: 85%;
    height: 80%;
  }
`;
const SubmitBtn = styled.input`
  margin-top: 20px;
  border: none;
  background: #B0AB99;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  &:hover{
    color: #000;
    background: #fff;
  }
  @media (min-width: 320px) and (max-width: 480px) {
    padding: 6px;
    margin-top:10px;
  }
  
`;
const MemoWrite = ({categories, optionColor, onOptionClick, onOptionBasic,
   title, content, onChangeTitle, onChangeContent, onSubmit, onSelect}) => {
  return (
    <Wrap>
      <Option color={optionColor}>
        <OptionColor color={'#EB6D8E'} onClick={onOptionClick} />
        <OptionColor color={'#E9D96C'} onClick={onOptionClick} />
        <OptionColor color={'#7E69DF'} onClick={onOptionClick} />
        <OptionBasic onClick={onOptionBasic} />
        <SelectBox onChange={onSelect}>
          <FolderSelect value=''>지정안함</FolderSelect>
          {categories.map((v, i)=><FolderSelect key={i} value={v}>{v}</FolderSelect>)}
        </SelectBox>
      </Option>
      <Form>
        <Title type="text" placeholder="제목을 입력하세요" value={title} onChange={onChangeTitle}/>
        <Content placeholder="내용" value={content} onChange={onChangeContent} />
        <SubmitBtn type="submit" value="완료" onClick={onSubmit}/>
      </Form>
    </Wrap>
  );
};

export default MemoWrite;