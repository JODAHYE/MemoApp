import axios from 'axios';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { color_filter, set_skip, list_memo, set_color } from '../modules/post';
import Loader from './Loader';
import MemoCardContainer from './MemoCardContainer';
import {HiChevronLeft, HiChevronRight} from 'react-icons/hi';
import {GrNote} from 'react-icons/gr';
import '../font.css';
const Wrap = styled.div`
  width: 60%;
  margin: 0 auto;
  text-align: center;
  position: relative;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 320px;
  }
`;
const FilterBox = styled.div`
  position: absolute;
  top: -40px;
  right: 40px;
  display: flex;
  @media (min-width: 320px) and (max-width: 480px) {
    right: 10px;
  }
`;
const Color = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props=>props.color};
  font-weight: 600;
  font-size: 22px;
  margin: 2px;
  border: 1px solid transparent;
  cursor: pointer;
  transform: scale(1);
  &:hover{
    border: ${props=>props.border?'none':'1px solid #fff;'} 
    transform: scale(1.5);
  }
  @media (min-width: 320px) and (max-width: 480px) {
    width: 18px;
    font-size: 18px;
    height: 18px;
  }
`;  

const NextBtn = styled(HiChevronRight)`
  background: #1D0660;
  color: #fff;
  cursor: pointer;
  margin-top: 40px; 
  padding: 8px;
  border-left: 1px solid #fff;
`;
const PrevBtn = styled(HiChevronLeft)`
background: #1D0660;
color: #fff;
cursor: pointer;
margin-top: 40px; 
padding: 8px;
`;
const Category = styled.p`
  position: absolute;
  left: 20px;
  top: -60px;
  font-size: 18px;
  margin: 14px;
  font-family: 'Sunflower', sans-serif;
  border: 1px solid #fff;
  border-radius: 20%;
  padding: 8px;
  @media (min-width: 320px) and (max-width: 374px) {
    left: 10%;
    top: -54px;
    font-size: 12px;  
  }
  @media (min-width: 375px) and (max-width: 480px) {
    left: 14%;
    top: -54px;
    font-size: 14px;
  }
`;
const NoteIcont = styled(GrNote)`
  margin-right: 10px;
  @media (min-width: 320px) and (max-width: 480px) {
    margin-right: 6px;
  }
`;
const MemoListContainer = () => {
  const {user} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const {skip} = useSelector(state=>state.post);
  const [memoList, setMemoList] = useState([]);
  const {category} = useSelector(state=>state.category);
  const [colorSkip, setColorSkip] = useState(0);
  const {color} = useSelector(state=>state.post);

  useEffect(()=>{
    if(!color && user._id) get_memos();
  },[category, skip, user._id]);

  useEffect(()=>{
    if(color && user._id) get_memos_color();
    if(!color && user._id) get_memos();
  }, [color, colorSkip, user._id]);

  const get_memos = async ()=>{
    if(color) dispatch(set_color(''));
    let body = {
      userId: user._id,
      skip: skip
    }
    if(category){
      body.categoryId = await axios.get(`/api/category/${user._id}/${category}`).then(res=>{
        return res.data.category._id;
      })
    }else body.categoryId = 'all';
    const request = dispatch(list_memo(body));
    const arr = await request.payload.then(arr=>arr);
    setMemoList(arr);
    return memoList;
  }


  const get_memos_color = async () => {
    let body = {
      userId: user._id,
      color: color,
      skip: colorSkip
    } 
    if(category){
      body.categoryId = await axios.get(`/api/category/${user._id}/${category}`).then(res=>{
        return res.data.category._id;
      })  
    }else body.categoryId = 'all';
    const arr = await dispatch(color_filter(body)).payload.then(arr=>arr);
    setMemoList(arr);
  }

  const onColorFilter = useCallback(e =>{
    const slice = e.target.getAttribute('color').substring(1,7);
    setColorSkip(0);
    dispatch(set_color(slice));
  },[colorSkip]);

  const onNext = useCallback(() => {
    if(!color) dispatch(set_skip(skip+6));
    if(color) {
      setColorSkip(colorSkip+6);
    }
  }, [color, skip, colorSkip]);
  
  const onPrev = useCallback(() => {
    if(!color && skip>5) dispatch(set_skip(skip-6));
    if(color && colorSkip>5) {
      setColorSkip(colorSkip-6);    
    }
  }, [color, skip, colorSkip]);

  return (
    <Wrap>
      <Category><NoteIcont />{category?category:'전체메모'}</Category>
      <FilterBox>
        <Color color={'#EB6D8E'} onClick={onColorFilter} />
        <Color color={'#E9D96C'} onClick={onColorFilter} />
        <Color color={'#7E69DF'} onClick={onColorFilter} />
      </FilterBox>
      {memoList!==undefined && memoList.map((v, i)=><MemoCardContainer key={i} memo={v}/>)}
      <div>
      {memoList!==undefined && (memoList.length<1 && skip<1) && <><Loader /><p>Maybe it doesn't exist. Press F5.</p></>}
      {memoList!==undefined && (memoList.length>=1 && memoList.length<6) && <PrevBtn onClick={onPrev} />}
      {memoList!==undefined && (memoList.length<1 && skip>0) && 
      <><p>It doesn't exist</p><PrevBtn onClick={onPrev} /></>}
      {memoList!==undefined && (memoList.length>=1&&memoList.length>=6) && 
      <><PrevBtn onClick={onPrev} /><NextBtn onClick={onNext} /></>} 
      </div>      
    </Wrap>
  );
};

export default memo(MemoListContainer);