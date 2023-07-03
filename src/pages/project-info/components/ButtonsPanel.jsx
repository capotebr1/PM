import React, { useState } from 'react';
import { Box, Button, Divider, Modal, Paper, Tooltip, Typography } from '@mui/material';
import { Delete, Edit, List, RemoveRedEye, Task } from '@mui/icons-material';
import StyledButton from './StyledButton';
import { deleteProject } from '../../../actions/projectsActions';
import { useNavigate } from 'react-router-dom';
import { removeProject } from '../../../services/ProjectServices';
import { useDispatch } from 'react-redux';
import CustomModal from './CustomModal';
import urgencyStyles from '../../../colorPalette';


function ButtonsPanel({projectID}) {

    const [ open, setOpen ] = useState(false);
    const handleClose = () => setOpen(false);
    const handeOpen = () => setOpen(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEdit = () => {
        navigate(`/project/edit/${projectID}`);
    }

    const handleDelete = () => {
        console.log("remover proyecto: " + projectID)
        removeProject(projectID)
        .then(response => {
            console.log(response);
            dispatch(deleteProject(projectID));
        });
        navigate("/");  
    }

    return (
        <>
            <CustomModal
                open={open}
                onClose={handleClose}
            >
                    <Typography mb={2} fontWeight="bold" variant="h5" component="h2">
                        Sure you want to delete the project?
                    </Typography>
                    <Box display="flex" justifyContent="space-evenly" >
                        <Button onClick={handleClose} variant="contained" color='primary' >Back</Button>
                        <Button onClick={handleDelete} variant="contained" color="warning">Delete</Button>
                    </Box>
            </CustomModal>
            <Box sx={{ p:1, display:"flex", gap: 4}} >
                <StyledButton tooltip="Delete Project" color="warning" onClick={handeOpen}> <Delete/> </StyledButton>
                <StyledButton tooltip="Edit Project" color="secondary" onClick={handleEdit}> <Edit/> </StyledButton>
            </Box>
        </>
    );
}

export default ButtonsPanel;
