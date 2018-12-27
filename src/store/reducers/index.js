import {combineReducers} from 'redux';
import auth from "./auth";
import settings from "./settings";
import product from "./product";
import store from "./store";

export default combineReducers({
auth,
settings,
product,
store
})