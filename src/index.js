import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createStore,applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import commonReducer from "./reducer/commonReducer";
import { composeWithDevTools } from "redux-devtools-extension";
//import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import App from './App';
const middlewares = [thunk];
if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);
    middlewares.push(logger);
}
const composeEnhancers = composeWithDevTools({});
export default function configureStore() {
      return createStore(commonReducer, composeEnhancers(applyMiddleware(...middlewares)));
    }
const store = configureStore();
ReactDOM.render(<Provider store={store}>< App /></Provider>, document.getElementById('root'));
