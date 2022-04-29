import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const SELECT = "category/SELECT";
const LIST = "category/LIST";

export const getCategoryList = () => async (dispatch) => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URI}/category/list/all`,
    {
      headers: {
        Authorization: cookies.get("colorit-accessToken"),
      },
    }
  );
  const data = response.data;
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
