import React, { useRef } from 'react';
import Navbar from '../../Navbar';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { postProject } from '../../services/ProjectServices';
import { addProject } from '../../actions/projectsActions';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function ProjectAdd(props) {
    const projectName = useRef();
    const projectDescription = useRef();
    const projectDeadline = useRef();
    const navigate = useNavigate();
    const handleSubmit = e => {
        e.preventDefault();
        const deadline = projectDeadline.current.value;
        console.log(deadline);
        const date = new Date().toISOString().slice(0,10);
        const projName = projectName.current.value;
        const projDesc = projectDescription.current.value;
        const { id } = Cookies.get();
        console.log(id);
        postProject(projName, projDesc, date, deadline, id)
        .then(data => dispatch(addProject(data.insertId, projName, projDesc, date, deadline, id)));
        navigate("/");
    }

    const handleClick = () => {
        navigate(-1)
    }
    
    return (
        <>
            <Navbar/>
            <Grid 
                container
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                mt={10}
            >
                <Paper sx={{p: 4}}>
                    <Typography textAlign="center" gutterBottom variant='h4' fontWeight="bold">Add project</Typography>
                    <Paper variant="outlined"
                        sx={{
                            p: 2
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <Box display="flex" alignItems="center" flexDirection="column" gap={2}>
                                <Box display="flex" flexDirection="column" gap={2}>
                                    <TextField variant="outlined" label="Project name" required inputRef={projectName} type="text" placeholder="Name" />
                                    <TextField variant="outlined" multiline={3} rows={2} label="Project Description"  inputRef={projectDescription} placeholder="Description"/>  
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker label="Estimated deadline" required inputRef={projectDeadline} format='YYYY-MM-DD'/>
                                    </LocalizationProvider>
                                </Box>
                                <Box display="flex" gap={2}>
                                    <Button onClick={handleClick} color="warning" type="submit" variant="contained">
                                        Go back
                                    </Button>
                                    <Button type="submit" variant="contained">
                                        Submit
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    </Paper>
                </Paper>
            </Grid>
        </>
    );
}

export default ProjectAdd;