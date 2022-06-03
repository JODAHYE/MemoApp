import PostAPI from "../lib/api/PostAPI";
const LIST = "post/LIST";
const SET_COLOR = "post/SET_COLOR";
const SET_SKIP = "post/SET_SKIP";
const CATEGORY_FILTER_LIST = "post/CATEGORY_FILTER_LIST";

export const getMemoList = (skip, color) => async (dispatch) => {
  const data = await PostAPI.getPostList(skip, color);
  if (!data.success) {
    alert(data.msg);
    if (skip > 0) {
      dispatch(setSkip(skip - 6));
    }
  }
  dispatch({ type: LIST, payload: data.posts });
};

export const getCategoryFilterList =
  (skip, category, color) => async (dispatch) => {
    const data = await PostAPI.getCategoryFilterList(skip, category, color);
    if (!data.success) {
      alert(data.msg);
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
