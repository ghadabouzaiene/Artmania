import {GET_USERS_SUCCESS,GET_USER_BAN} from "./authTypes"
import axios from 'axios'
import { prefixe } from "../../helpers/constant"

import { clearError, setError, startLoading, stopLoading } from "./appStateActions"



export const getUsers = () => async (dispatch) => {
    dispatch(clearError())
    dispatch(startLoading("Get Users"))
    try {
        
        const { data } = await axios.get(`${prefixe}/api/user/`)
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: data
        })
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}


export const banUser = (id,info) => async (dispatch) => {
    dispatch(clearError())
    dispatch(startLoading("Get Users"))
    try {
        
        const { data } = await axios.put(`${prefixe}/api/user/${id}`,info)
        dispatch({
            type: GET_USER_BAN,
            payload: data
        })
    }
    catch (err) {
        dispatch(stopLoading())
        dispatch(setError(err.response.data.errors))
    }
}

