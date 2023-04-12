import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    let location = useLocation();
    const token = sessionStorage.getItem("usertoken")
    const userToken = useSelector((store) => store.credential.user?.accessToken)

    if(!userToken && !token) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;