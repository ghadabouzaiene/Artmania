import {GET_USERS_SUCCESS } from "../actions/authTypes"

const initState = {
    allusers : localStorage.getItem('users')? JSON.parse(localStorage.getItem('user'))   : []
}

const usersReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case GET_USERS_SUCCESS:
            return {
                ...state,
                allusers: payload
            }

            default:
                return state
    }}

    export default usersReducer