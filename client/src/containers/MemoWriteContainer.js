import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemoWrite from '../components/MemoWrite';
import { init_category, list_category, select_category } from '../modules/category';
import { write_memo } from '../modules/post';
const MemoWriteContainer = () => {
  const {user} = useSelector(state=>state.user);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [optionColor, setOptionColor] = useState('#8C8C8C');
  const dispatch = useDispatch();
  const {categories, category} = useSelector(state=>state.category);
  useEffect(()=>{
    if(user){
      dispatch(list_category(user._id))
      dispatch(init_category());  
    }
  }, [user]);
  const onChangeTitle = useCallback(e => {
    setTitle(e.target.value);
  }, [title]);
  const onChangeContent = useCallback(e =>{
    setContent(e.target.value);
  }, [content]);
  const onOptionClick = useCallback(e => {
    setOptionColor(e.target.getAttribute('color'));
  }, [optionColor])
  const onOptionBasic = useCallback(() => {
    setOptionColor('#8C8C8C');
  }, [optionColor]);
  const onSelect = useCallback (e=> {
    dispatch(select_category(e.target.value));
  }, [category]);
  const onSubmit = useCallback(e => {
    e.preventDefault();
    if(!title || !content){
      return alert('값을 입력해주세요')
    }
    if(title.length>50){
      return alert('제목은 최대 50글자 입력 가능합니다')
    }
    let body = {
      userId: user._id,
      title: title,
      content: content, 
      color: optionColor,
    }

    if(category){
      axios.get(`/api/category/${user._id}/${category}`).then(async res=>{
        body.category = await res.data.id;
        dispatch(write_memo(body));
      })
    }else{
      dispatch(write_memo(body)); 
    }
  }, [title, content, optionColor, user]);

  return (
    <MemoWrite categories={categories} optionColor={optionColor} onOptionClick={onOptionClick} 
    onOptionBasic={onOptionBasic} title={title} content={content} onChangeTitle={onChangeTitle}
     onChangeContent={onChangeContent} onSubmit={onSubmit} onSelect={onSelect} />
  );
};

export default MemoWriteContainer;