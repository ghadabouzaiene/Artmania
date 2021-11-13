import React from 'react'
import Spinner from './spinner.gif';
const Loader = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <img src={Spinner} alt="" className="w-24 h-24"/>
        </div>
    )
}

export default Loader
