import Cookies from "universal-cookie";
import AuthAPI from "../lib/api/AuthAPI";

const cookies = new Cookies();

const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";

const initialState = {
  isLogin: cookies.get("user") ? true : false,
};

export const login = (body) => async (dispatch) => {
  const data = await AuthAPI.login(body);
  if (!data.success) {
    return alert(data.msg);
  }
  cookies.set("user", data.userId, {
    path: "/",
    maxAge: 60 * 60 * 2,
  });
  dispatch({ type: LOGIN });
};

export const logout = () => async (dispatch) => {
  cookies.remove("user");
  const data = await AuthAPI.logout();
  if (!data.success) {
    return alert("로그아웃 실패");
  }
  window.location.reload();
  dispatch({ type: LOGOUT });
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLogin: true };
    case LOGOUT:
      return { ...state, isLogin: false };
    default:
      return state;
  }
}
