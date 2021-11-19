
import React, {useState } from 'react'
import { useDispatch} from 'react-redux'
import { useHistory } from 'react-router'
import { banUser} from '../redux/actions/usersActions'
import './Admin.css'

const Ban = ({match}) => {
const history=useHistory()
const  dispatch = useDispatch()
const [info,setInfo]=useState({
    isBanned :true
})

const BanUser =()=>{
    dispatch(banUser(match.params.id,info))
    history.push('/admin')
    window.location.reload()
}



    return (
        <div className="banning"> 
            <h1>Ban This User? </h1>
        <button onClick={BanUser}>Validate</button>
        </div>
    )
}

export default Ban
