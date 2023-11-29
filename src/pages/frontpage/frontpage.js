import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Text, CustomizedButtons, Title } from '../../components';
import { Box } from '@mui/material';

export default function Frontpage({ setIsLoggedIn, user }) {
    const navigate = useNavigate();

    const centrer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mt: 2
    }
    console.log(user)
    return (

        <Box sx={{
            centrer
        }}>
            Frontpage
        </Box>

    );
}