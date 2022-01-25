import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { init_category } from '../modules/category';
import { menu_list, menu_write } from '../modules/menu';
import { logout } from '../modules/user';

const NavContainer = () => {
  const {user} = useSelector(state=>state.user);
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  
  const onLogout = useCallback(() => {
    dispatch(logout());
    navigate('/');
  }, []);

  const onMenuClick = useCallback((e) => {
    if(e.target.innerText==='메모하기'){
      dispatch(menu_write());
    }
    if(e.target.innerText==='내 메모지'){
      dispatch(init_category());
      dispatch(menu_list());
      dispatch(init_skip());
      dispatch(set_color(''));  
    }
  },[]);
  return (
    <Nav user={user} onLogout={onLogout} onMenuClick={onMenuClick} />
  );
};

export default memo(NavContainer);
