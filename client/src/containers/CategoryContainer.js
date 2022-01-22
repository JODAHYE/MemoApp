import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Category from '../components/Category';
import { create_category, delete_category, init_category, list_category, select_category } from '../modules/category';
import { menu_list } from '../modules/menu';
import { init_skip, set_color } from '../modules/post';

const CategoryContainer = ({isFolderOpen, onFolderToggle}) => {
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.user); 
  const {categories} = useSelector(state=>state.category);
  useEffect(()=>{
    dispatch(list_category(user._id))
  }, []);

  const onChangeInput = useCallback( e => {
    setValue(e.target.value);
  }, [value]);
  const onAddClick = useCallback(() => {
    setAdd(true);
  }, [add]);
  const onCancel = useCallback(() => {
    setAdd(false);
    setRemove(false);
  }, [add, remove]);
  const isCorrectStr = () =>{
    for(let i=0; i<value.length; i++){
      if(value.charCodeAt(i)>=21 && value.charCodeAt(i)<48) return false;
      if(value.charCodeAt(i)>=58 && value.charCodeAt(i)<65) return false;
      if(value.charCodeAt(i)>=91 && value.charCodeAt(i)<97) return false;
      if(value.charCodeAt(i)>=123 && value.charCodeAt(i)<127) return false;
    }
    return true; 
  }
  const onAdd = useCallback(() =>{
    let body = {
      userId: user._id,
      name: value
    }
    if(!value){
      return alert('값을 입력해주세요');
    }
    if(!isCorrectStr()){
      return alert('특수문자는 사용할 수 없습니다.');
    }
    if(value.length>18){
      return alert('폴더명은 18글자까지 입력할 수 있습니다 ');
    }
    dispatch(create_category(body)).then(res=>{
      if(res.data.isExist){
        return alert('이미 존재하는 폴더입니다');
      }
      dispatch(list_category(user._id));
      setValue('');
    });
  },[value]);

  const onRemoveClick = useCallback(() => {
    setRemove(true);
  },[remove]);
  const onRemove = useCallback(() => {
    dispatch(delete_category(user._id, value));
  }, [value]);

  const onFolderClick = useCallback(e => {
    dispatch(select_category(e.target.innerHTML));
    dispatch(init_skip());
    dispatch(set_color(''));
    dispatch(menu_list());
  }, []);
  const onAllFolders = useCallback(() => {
    dispatch(init_category());
    dispatch(init_skip());
    dispatch(set_color(''));
    dispatch(menu_list());
  }, []);

  return (
    <div>
      <Category onFolderToggle={onFolderToggle} isFolderOpen={isFolderOpen} onAllFolders={onAllFolders} onFolderClick={onFolderClick} value={value} categories={categories}
      onAdd={onAdd} onChangeInput={onChangeInput} onAddClick={onAddClick} onCancel={onCancel} onRemoveClick={onRemoveClick} 
      add={add} remove={remove} onRemove={onRemove}/>
    </div>
  );
};

export default CategoryContainer;
