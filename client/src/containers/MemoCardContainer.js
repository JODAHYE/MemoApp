import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemoCard from '../components/MemoCard';
import {delete_memo, set_memo} from '../modules/post';
import MemoUpdateContainer from './MemoUpdateContainer';

const MemoCardContainer = ({memo}) => {
  const dispatch = useDispatch();
  const [isUpdate, setIsUpdate] = useState(false);
  const {user} = useSelector(state=>state.user);
  const onMemoHandle = useCallback(e => {
    if(e.target.innerHTML==='수정'){
      setIsUpdate(true);
    }else{
      dispatch(delete_memo(user.id, memo.title, memo._id));
    }
  },[]);
  const onDetail = useCallback(() => {
    dispatch(set_memo(memo));
  },[]);
  return (
    <>{isUpdate ? <MemoUpdateContainer memo={memo} setIsUpdate={setIsUpdate}/> 
    : <MemoCard onDetail={onDetail} memo={memo} onMemoHandle={onMemoHandle}/>}</>
  )
};

export default MemoCardContainer;