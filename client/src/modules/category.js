import axios from "axios";

const CREATE = "category/CREATE";
const DELETE = "category/DELETE";
const SELECT = "category/SELECT";
const INIT = "category/INIT";
const LIST = "category/LIST";
export const create_category = (body) => () => {
  return axios.post('/api/category/create', body);
}

export const list_category = (userId) => dispatch =>{
  axios.get(`/api/category/list/${userId}/all`).then(res=>{
    let arr = [];
    res.data.categories.map(v=>{
      arr.push(v.name);
    })
    dispatch({type: LIST, payload: arr});
  });
}
export const get_categories = (arr) => {
  return {
    type: LIST,
    payload:arr
  }
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
  category: '',
  categories: []
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
    case LIST:
      return {...state, categories: action.payload}
    default:
      return state;
  }
  
}