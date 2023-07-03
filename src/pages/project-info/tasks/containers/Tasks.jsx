import { Box, CircularProgress, Divider, IconButton, LinearProgress, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import TaskItem from '../TaskItem';
import { useSelector } from 'react-redux';
import { Add } from '@mui/icons-material';
import TaskForm from '../TaskForm';
import urgencyStyles from '../../../../colorPalette';
import Cookies from 'js-cookie';
import CircularProgressWithLabel from '../../components/CiruclarProgressWithLabel';
import TasksColumn from '../TasksColumn';
import { isUserAdmin } from '../../../../utils/functions';
import TaskColumnHeader from '../TaskColumnHeader';
function Tasks() {

    const { id } = useParams();
    const [ showForm , setShowForm ] = useState(false);
    const urgency = useRef();
    const handleClose = () => setShowForm(false);

    const projectSelector = state => state.projects[0];
    const { user_id, owner } = useSelector(projectSelector);

    const handleShow = (index) => {
        urgency.current = index;
        setShowForm(!showForm)
    }

    return (
        <Box 
            height="100%"
            bgcolor="#fff"
            borderRadius={2}
            boxShadow="0px 0px 10px 0px rgba(0,0,0,0.15)"
            p={2}
        >
            <TaskForm handleClose={handleClose} urgency={urgency.current} showModal={showForm} ownerID={user_id}/>
            <Stack mb={2}>
                <Typography variant='h5' fontWeight="bold"  >Tasks</Typography>
            </Stack>
            <div className='tasks-container'>
            {
                [0,1,2].map(index => (
                    <Box
                        key={index}
                        borderRadius={1}
                        width="100%"
                    >
                        <TaskColumnHeader
                            urgency={urgencyStyles[index].urgency}
                            color={urgencyStyles[index].color}
                            owner={user_id}
                            index={index}
                            handleShow={handleShow}
                        />
                        <TasksColumn 
                            urgency={index + 1} 
                            user_id={user_id}
                            owner={owner}
                        />
                    </Box>
                ))
            }
            </div>
        </Box>
    );
}

export default Tasks;