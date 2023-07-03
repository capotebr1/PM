import { Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Navbar';

function User() {
    const { id } = useParams();  
    return (
        <Box>
            <Navbar/>
            usuario: {id}
        </Box>
    );
}

export default User;