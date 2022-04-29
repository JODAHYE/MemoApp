import { combineReducers } from "redux";
import user from "./user";
import post from "./post";
import menu from "./menu";
import category from "./category";

const rootReducer = combineReducers({
  user,
  post,
  menu,
  category,
});
export default rootReducer;
