import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/navBar';

const Layout = ({ navn, pages }) => {


    return (
        <Box sx={{
            mt: 4,
            p: 8
        }}>
            <NavBar pages={pages} navn={navn} />
            <Outlet />
        </Box>
    );
}

export default Layout;