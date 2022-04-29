const SET_CURRENT_MENU = "menu/SET_CURRENT_MENU";

export const setCurrentMenu = (menu) => {
  return {
    type: SET_CURRENT_MENU,
    payload: menu,
  };
};

const initialState = {
  menu: "My memos",
};

export default function menuReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_MENU:
      return { menu: action.payload };
    default:
      return state;
  }
}
