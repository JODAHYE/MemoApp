import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Login from '../components/Login';
import { set_token } from '../modules/user';


const LoginContainer = () => {
  const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`
  const dispatch = useDispatch();
  const [loginUrl, setLoginUrl] = useState('');

  useEffect(()=>{
    setLoginUrl(authUrl);
    const code = new URL(window.location.href).searchParams.get("code");
    if(code!=null) {
      dispatch(set_token(code));
    };
  },[]);


  return (
    <Login loginUrl={loginUrl} />
  );
};

export default memo(LoginContainer);