import axios from "axios";
import qs from "qs";

const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const INFO = "user/INFO";


//토큰 설정하기
export const set_token = (code) => async dispatch => {
  const payload = qs.stringify({
    grant_type: "authorization_code",
    client_id: process.env.REACT_APP_REST_API_KEY,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    code: code,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
  });
  try {
    // access token 가져오기
    const res = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      payload
    );
    // access token 설정
    window.Kakao.Auth.setAccessToken(res.data.access_token);
    dispatch({type: LOGIN});
    dispatch(get_info());
  } catch (err) {
    console.log(err);
  }
};
export const get_info = () => dispatch => {
  window.Kakao.API.request({
    url: '/v2/user/me',
    success: async (response)=>{
      await axios.post('/api/user/sign_up', {id: response.id, token: window.Kakao.Auth.getAccessToken()}).then(res=>{
        const info = {
          _id: res.data.user._id,
          id: response.id,
          name: response.properties.nickname,
          profile_image: response.properties.profile_image,
        }
        return dispatch(user_info(info));
      })  //id가 디비에 없으면 저장
    },
    fail: function(error) {
        console.log(error);
    }
  });
}

export const user_info = (data) => {
  return{
    type: INFO,
    payload: data
  }
}

export const logout = () => async dispatch => {
  if (!window.Kakao.Auth.getAccessToken()) {
    console.log('Not logged in.');
    return;
  }
  await axios.get(`/api/user/logout/${window.Kakao.Auth.getAccessToken()}`);
  window.Kakao.Auth.logout(function() {
    dispatch({type: LOGOUT});
  });
}


const initialState = {
  user: {},
  isLogin: window.Kakao.Auth.getAccessToken() ? true : false,
  token: window.Kakao.Auth.getAccessToken() ? window.Kakao.Auth.getAccessToken() : ''
}

export default function userReducer(state=initialState, action){

  switch(action.type){
    case LOGIN:
      return {...state, isLogin: true, token: window.Kakao.Auth.getAccessToken()}
    case LOGOUT:
      return {...state, isLogin: false, token: '', user: {}}
    case INFO: 
      return {...state, user: action.payload}
    default:
      return state
  }
}