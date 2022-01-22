import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MemoWriteContainer from './MemoWriteContainer';
import MemoListContainer from './MemoListContainer';
import NavContainer from './NavContainer';
import CategoryContainer from './CategoryContainer';
import MemoDetailContainer from './MemoDetailContainer';
import { set_memo } from '../modules/post';
import {RiFolderOpenFill} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
const Wrap = styled.div`
  background: #F0F0F0;
  min-height: 100vh;
  position: relative;
`;
const ContentBox = styled.div`
  background: #F0F0F0;
  padding: 106px;
  width: 80%;
  margin: 0 auto;
  position: relative;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    box-sizing: border-box;
    padding: 80px 20px;
    position: absolute;
    top: 56px;
  }
`;
const Dark = styled.div`
  background: rgba(0,0,0,0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
`;
const FolderOpenBtn = styled(RiFolderOpenFill)`
  @media (min-width: 320px) and (max-width: 374px) {
    position: absolute;
    left: 20px;
    top: 40px;
    font-size: 22px;
    border-radius: 50%;
    background: #fff;
    color: #1D0660;
    padding: 6px;
    box-shadow: 2px 2px 2px 2px #B4B4B5;
  }
  @media (min-width: 375px) and (max-width: 480px) {
    position: absolute;
    left: 46px;
    top: 40px;
    font-size: 24px;
    border-radius: 50%;
    background: #fff;
    color: #1D0660;
    padding: 6px;
    box-shadow: 2px 2px 2px 2px #B4B4B5;
} 
`;
const MemoPageContainer = () => {
  const {menu} = useSelector(state=>state.menu);
  const {isDetail} = useSelector(state=>state.post);
  const {post} = useSelector(state=>state.post);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const dispatch = useDispatch();
  const onClose = () => {
    if(isDetail) dispatch(set_memo(post));
  }
  const onFolderToggle = useCallback(() => {
    setIsFolderOpen(!isFolderOpen)
  }, [isFolderOpen]);
  return (  
    <Wrap>
      <NavContainer/>
      <ContentBox>
        <FolderOpenBtn onClick={onFolderToggle}>열기</FolderOpenBtn>
        <CategoryContainer onFolderToggle={onFolderToggle} isFolderOpen={isFolderOpen}/>
        {menu==='메모하기' && <MemoWriteContainer />}
        {menu==='내 메모지' && <MemoListContainer />}
      </ContentBox>
      {isDetail&&<><Dark onClick={onClose}/><MemoDetailContainer onClose={onClose} /></>}    
    </Wrap>
  );
};

export default MemoPageContainer;