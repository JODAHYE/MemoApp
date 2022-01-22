import { combineReducers } from "redux";
import user from './user';
import post from './post';
import menu from './menu';
import category from './category';
import {persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "post", "menu", "category"]
}
const rootReducer = combineReducers({
  user, post, menu, category
})
export default persistReducer(persistConfig, rootReducer);