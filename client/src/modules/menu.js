const LIST = "menu/LIST";
const WRITE = "menu/WRITE";

export const menu_list = () =>{
  return {
    type: LIST
  }
}
export const menu_write = () =>{
  return {
    type: WRITE
  }
}
const initialState = {
  menu: '내 메모지'
}

export default function menuReducer(state=initialState, action){
  console.log(action, state);
  switch(action.type){
    case LIST:
      return {menu: '내 메모지'}
    case WRITE:
      return {menu: '메모하기'}
    default:
      return state
  }
}