/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Loading/Loading';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const {user,isLoading} = useSelector(state=>state.user)
    const location = useLocation();
    if(isLoading){
        return <div className='h-screen flex items-center justify-center'>
            <Loading/>
        </div>
    }

    if(user?.email){
        return children
    }

    return (
        <Navigate to="/login" state={{from:location}} replace/>
    );
};

export default PrivateRoute;