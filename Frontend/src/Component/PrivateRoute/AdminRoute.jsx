/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import loading from '../../assets/others/loader2.gif'
import CurrentUser from '../../utilis/CurrentUser';

const AdminRoute = ({children}) => {
    const {user,isLoading} = useSelector(state=>state.user)
    const location = useLocation(); 
    CurrentUser()
    if(isLoading){
        
        return <div>
        <img src={loading} alt="loading" className=" mx-auto"/>
    </div>
    }

    if(user && user?.role === 'admin')
        return children
    return <Navigate to = '/' state={{from:location}} replace />
};

export default AdminRoute;