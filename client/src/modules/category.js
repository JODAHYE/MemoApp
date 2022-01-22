import axios from "axios";

const CREATE = "category/CREATE";
const DELETE = "category/DELETE";
const SELECT = "category/SELECT";
const INIT = "category/INIT";
export const create_category = (body) => () => {
  return axios.post('/api/category/create', body);
}

export const list_category = (userId) => () =>{
  return axios.get(`/api/category/list/${userId}/all`);
}

export const delete_category = (userId, name)=>()=>{
  if(window.confirm(`<${name}> 폴더를 삭제하시겠습니까?\n 해당 폴더의 메모들도 삭제됩니다.`)){
    window.location.reload('/memo');
    return axios.delete(`/api/category/delete/${userId}/${name}`);
  }
} 

export const select_category = (folder) =>{
  return{
    type: SELECT,
    payload: folder
  }
}
export const init_category = () => {
  return {
    type: INIT,
  }
}

const initialState = {
  category: ''
}

export default function categoryReducer(state=initialState, action){
  switch(action.type){
    case CREATE:
      return {...state}
    case DELETE:
      return {...state}
    case SELECT:
      return {...state, category: action.payload}
    case INIT:
      return {...state, category: ''}
    default:
      return state;
  }
  
}