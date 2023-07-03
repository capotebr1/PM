import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Navbar';
import { updateProject } from '../../services/ProjectServices';
import { editProject } from '../../actions/projectsActions';

function ProjectEdit() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const projectName = useRef();
    const projectDescription = useRef();

    const handleClick = () => {
        navigate(-1);
    }

    const handleEdit = () => {
        const name =  projectName.current.value;
        const description =  projectDescription.current.value;
                
        updateProject( id, name, description )
        .then(() => {
            dispatch(editProject(id, name, description))
        })

        navigate(-1)
    }

    return (
        <>
            <Navbar/>
            <Grid 
                container
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Paper
                sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems:"center",
                    justifyContent: "center",
                    gap: 2
                }}>
                    <Typography variant='h4' fontWeight="bold" textAlign="center">
                        Edit project
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField inputRef={projectName} label="name" />
                        <TextField inputRef={projectDescription} multiline={3} label="description" />
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Button onClick={handleClick} color="warning" type="submit" variant="contained">
                            Go back
                        </Button>
                        <Button onClick={handleEdit} type="submit" variant="contained">
                            Submit
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        </>
    );
}

export default ProjectEdit;