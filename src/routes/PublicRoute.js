import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/register';

const Publicroute = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Register />} />
        </Routes>
    );
}

export default Publicroute;
