import React from 'react'
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function HomeLayout() {
    return (
        <>
        <Navbar />
        <Outlet/>
        </>
    )
}

export default  HomeLayout;