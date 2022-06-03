import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import BasicLayout from '../layout/BasicLayout';
import AddAuthority from '../pages/AddAuthority';
import AddServices from '../pages/AddServices';
import Error from '../pages/Error';
import Home from '../pages/Home';
import ListAuthorities from '../pages/ListAuthorities';
import ListServices from '../pages/ListServices';

const Privateroute = () => {
    const user = useSelector(state => state.auth)
    return (
        <div>
            {user?.token && <Routes>
                <Route path='/home' element={<BasicLayout><Home /></BasicLayout>} />
                <Route path='/listauthorities' element={<BasicLayout><ListAuthorities /></BasicLayout>} />
                <Route path='/listservices' element={<BasicLayout><ListServices /></BasicLayout>} />
                <Route path='/add-authorities' element={<BasicLayout><AddAuthority /></BasicLayout>} />
                <Route path='/add-services' element={<BasicLayout><AddServices /></BasicLayout>} />
                <Route path='/add-services/:id' element={<BasicLayout><AddServices /></BasicLayout>} />
            </Routes>
            }

        </div>
    );
}

export default Privateroute;
