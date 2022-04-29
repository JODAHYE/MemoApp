import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules/index";
import ReduxThunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
