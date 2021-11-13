import {GET_USERS_SUCCESS,GET_PHOTOS_SUCCESS } from "./authTypes"
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

