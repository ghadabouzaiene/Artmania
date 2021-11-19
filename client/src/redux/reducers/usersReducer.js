import {GET_USERS_SUCCESS, GET_USER_BAN } from "../actions/authTypes"

const initState = {
    allusers : localStorage.getItem('users')? JSON.parse(localStorage.getItem('users'))   : [],
    usertoban : localStorage.getItem('usertoban')? JSON.parse(localStorage.getItem('usertoban'))   : []
}


const usersReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case GET_USERS_SUCCESS:
            localStorage.setItem('users', JSON.stringify(payload))
            return {
                ...state,
                allusers: payload
            }
            case GET_USER_BAN:
                localStorage.setItem('usertoban', JSON.stringify(payload))
                return {
                    ...state,
                    getuserban: payload
                }
    

            default:
                return state
    }}

    export default usersReducer