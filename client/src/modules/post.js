import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const LIST = "post/LIST";
const SET_COLOR = "post/SET_COLOR";
const SET_SKIP = "post/SET_SKIP";
const CATEGORY_FILTER_LIST = "post/CATEGORY_FILTER_LIST";

export const getMemoList = (skip, color) => async (dispatch) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URI}/post/list`,
    {
      headers: {
        Authorization: cookies.get("colorit-accessToken"),
      },
      params: {
        skip,
        color,
      },
    }
  );
  const data = await response.data;
  if (!data.success) {
    alert(data.msg);
    dispatch(setSkip(skip - 6));
  }
  dispatch({ type: LIST, payload: data.posts });
};

export const getCategoryFilterList =
  (skip, category, color) => async (dispatch) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URI}/post/list/filter`,
      {
        headers: {
          Authorization: cookies.get("colorit-accessToken"),
        },
        params: {
          skip,
          category,
          color,
        },
      }
    );
    const data = await response.data;
    if (!data.success) {
      alert(data.msg);
      dispatch(setSkip(skip - 6));
    }
    dispatch({ type: CATEGORY_FILTER_LIST, payload: data.posts });
  };

export const setColor = (data) => {
  return {
    type: SET_COLOR,
    payload: data,
  };
};

export const setSkip = (data) => {
  return {
    type: SET_SKIP,
    payload: data,
  };
};

const initialState = {
  memos: [],
  color: "",
  skip: 0,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case LIST:
      return { ...state, memos: action.payload };
    case SET_COLOR:
      return { ...state, color: action.payload };
    case SET_SKIP:
      return { ...state, skip: action.payload };
    case CATEGORY_FILTER_LIST:
      return { ...state, memos: action.payload };
    default:
      return state;
  }
}
