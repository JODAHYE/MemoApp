import axios from 'axios';
const WRITE = "post/WRITE";
const UPDATE = "post/UPDATE";
const LIST = "post/LIST";
const DELETE = "post/DELETE";
const SET = "post/SET";
const SKIP = "post/SKIP";
const SKIP_INIT = "post/SKIP_INIT"
const SET_COLOR = "post/SET_COLOR";

export const write_memo = (body) => async () => {
  await axios.post('/api/post/save', body);
  alert('게시글이 작성되었습니다');
  window.location.reload('/');
}

export const list_memo = (body) => {
  const request = axios.get(`/api/post/list/${body.userId}/${body.categoryId}/${body.skip}`).then(res=>{
    return res.data.posts;
  });
  return {
    type:LIST,
    payload: request
  }
}
export const color_filter = (body) => {
  const request = axios.get(`/api/post/list/${body.userId}/${body.categoryId}/${body.color}/${body.skip}`).then(res=>{
    return res.data.posts;
  });
  return {
    type: LIST,
    payload: request
  }
}
export const delete_memo = (userId, title, postId) => () => {
  if(window.confirm(`<${title}>를 정말 삭제하시겠습니까?`)){
    axios.delete(`/api/post/delete/${userId}/${postId}`).then(res=>{
      alert('메모를 삭제하였습니다.');
      window.location.reload('/');
    })
  }
}

export const update_memo = (body) => {
  if(window.confirm(`<${body.title}>을 수정하시겠습니까?`)){
    axios.post('/api/post/update', body).then(res=>{
      console.log(res.data);
      alert('메모를 수정하였습니다.');
      window.location.reload('/');
    });  
  }
  return {
    type: UPDATE
  }
}
export const set_memo = (memo) => {
  return {
    type: SET,
    payload: memo
  }
}

export const set_skip = (num)=>{
  return {
    type: SKIP,
    payload:num
  }
}

export const init_skip = () => {
  return {
    type: SKIP_INIT,
    payload: 0
  }
}

export const set_color = data => {
  return {
    type:SET_COLOR,
    payload:data
  }
}


const initialState = {
  post: {},
  isDetail: false,
  posts: [],
  skip: 0,
  color: '',
}



export default function postReducer(state=initialState, action){

  switch(action.type){
    case WRITE:
      return {...state, post: action.payload}
    case UPDATE:
      return {...state,}
    case LIST:
      return {...state, posts: action.payload} 
    case DELETE:
      return {...state}
    case SET:
      return {...state, post: action.payload, isDetail: !state.isDetail}
    case SKIP:
      return {...state, skip: action.payload}
    case SKIP_INIT:
      return {...state, skip: action.payload}
    case SET_COLOR:
      return {...state, color: action.payload}
    default:
      return state
  }
}