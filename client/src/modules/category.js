import CategoryAPI from "../lib/api/CategoryAPI";

const SELECT = "category/SELECT";
const LIST = "category/LIST";

export const getCategoryList = () => async (dispatch) => {
  const data = await CategoryAPI.getCategoryList();
  dispatch({ type: LIST, payload: data.categories });
};

export const setCategory = (category) => {
  return {
    type: SELECT,
    payload: category,
  };
};

const initialState = {
  category: "",
  categories: [],
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT:
      return { ...state, category: action.payload };
    case LIST:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
}
