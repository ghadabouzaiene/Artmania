import React from 'react'
import api from './Random'
const IndexPage = () => {
    // Create state variables
    let [responseData, setResponseData] = React.useState([])
    // fetches data
    const fetchData = (e) => {
        e.preventDefault()
        api.getData()
        .then((response)=>{
            setResponseData(response.data)
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return (
        <div>
           
        </div>
    )
}
export default IndexPage