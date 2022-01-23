import axios from 'axios';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemoUpdate from '../components/MemoUpdate';
import { list_category } from '../modules/category';
import { update_memo } from '../modules/post';

const UpdateContainer = ({memo, setIsUpdate}) => {
  const {user} = useSelector(state=>state.user);
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);
  const [optionColor, setOptionColor] = useState(memo.color);
  const [index, setIndex] = useState(0);
  const {categories} = useSelector(state=>state.category);
  const [folder, setFolder] = useState('');
  const dispatch = useDispatch();
  const colorArr = ['#8C8C8C', '#EB6D8E', '#E9D96C', '#7E69DF'];
  useEffect(()=>{
    if(user._id) dispatch(list_category(user._id));
  }, [user._id]);

  const onChangeTitle = useCallback(e => {
    setTitle(e.target.value);
  },[title]);
  const onChangeContent = useCallback(e =>{
    setContent(e.target.value);
  },[content]);

  const onOptionClick = useCallback(() => {
    setIndex(index+1);
    setOptionColor(colorArr[index%4]);
  }, [optionColor, index]);
  const onSelect = useCallback(e=> {
    setFolder(e.target.value);
  }, [folder]);
  const onSubmit = useCallback(e => {
    e.preventDefault();
    if(!title || !content){
      return alert('값을 입력해주세요')
    }
    if(title.length>30){
      return alert('제목은 최대 30글자 입력 가능합니다')
    }
    if(e.target.value === '취소'){
      return setIsUpdate(false);
    }
    let body = {
      _id: memo._id,
      title: title,
      content: content, 
      color: optionColor,
    }
    
    if(folder){
      axios.get(`/api/category/${user._id}/${folder}`).then(async res=>{
        body.category = await res.data.id;
        dispatch(update_memo(body));
      })
    }else{
      dispatch(update_memo(body)); 
    }
  },[title, content, optionColor, folder]);



  return (
    <MemoUpdate onSelect={onSelect} categories={categories} optionColor={optionColor} title={title} onChangeTitle={onChangeTitle} 
    onChangeContent={onChangeContent} content={content} onOptionClick={onOptionClick} 
    onSubmit={onSubmit} />
  );
};

export default memo(UpdateContainer);