import { combineReducers } from "redux";
import appStateReducer from "./appStateReducer";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";



export default combineReducers({
    auth: authReducer,
    appState: appStateReducer,
    users : usersReducer
})