import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from './user/index';

export default combineReducers({
    auth
})
