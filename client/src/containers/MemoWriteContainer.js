import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemoWrite from '../components/MemoWrite';
import { list_category } from '../modules/category';
import { write_memo } from '../modules/post';
const MemoWriteContainer = () => {
  const {user} = useSelector(state=>state.user);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [optionColor, setOptionColor] = useState('#8C8C8C');
  const dispatch = useDispatch();
  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState('');
  useEffect(()=>{
    dispatch(list_category(user.id)).then(res=>{
      let arr = [];
      res.data.categories.map((v, i)=>{
        arr.push(v.name);
      })
      setFolders(folders.concat(arr));
    });
  }, []);
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
    setFolder(e.target.value);
  }, [folder]);
  const onSubmit = useCallback(e => {
    e.preventDefault();
    if(!title || !content){
      return alert('값을 입력해주세요')
    }
    if(title.length>50){
      return alert('제목은 최대 50글자 입력 가능합니다')
    }
    let body = {
      userId: String(user.id),
      title: title,
      content: content, 
      color: optionColor,
    }
    if(folder){
      axios.get(`/api/category/${user.id}/${folder}`).then(async res=>{
        body.category = await res.data.id;
        dispatch(write_memo(body));
      })
    }else{
      dispatch(write_memo(body)); 
    }
  }, [title, content, optionColor, folder, user]);

  return (
    <MemoWrite folders={folders} optionColor={optionColor} onOptionClick={onOptionClick} 
    onOptionBasic={onOptionBasic} title={title} content={content} onChangeTitle={onChangeTitle}
     onChangeContent={onChangeContent} onSubmit={onSubmit} onSelect={onSelect} />
  );
};

export default MemoWriteContainer;