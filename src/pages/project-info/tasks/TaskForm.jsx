import { Box, Button, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postTask } from '../../../services/TaskServices';
import { addTask } from '../../../actions/taskActions';
import CustomModal from '../components/CustomModal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { postTaskMember } from '../../../services/MemberServices';
import { TASK } from '../../../models/task.class';

function TaskForm({handleClose, showModal, urgency, ownerID }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const taskName = useRef();
    const taskDescription = useRef();
    const taskDeadline = useRef();

    const handleSubmit = async e => {
        e.preventDefault();
        const creationDate = new Date().toISOString().slice(0,10);
        const name = taskName.current.value;
        const description = taskDescription.current.value;
        const deadline = taskDeadline.current.value;
        
        try {
            const response = await postTask(name, description, creationDate, deadline , id, urgency);
            console.log(response);
            const newTask = new TASK(
                response.insertId,
                name,
                description,
                creationDate,
                deadline,
                urgency,         
                ownerID,
                id,
            );
            console.log(newTask);
            postTaskMember(response.insertId, ownerID, ownerID)
            .then((res) => {
                console.log(res);
            })           

            dispatch(addTask(newTask));
            handleClose();

        } catch (error) {
            console.error("error")
        }
        taskName.current.value = "";
    };

    return (
        <CustomModal
            open={showModal}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <Box
                    display="flex"
                    justifyContent="space-evenly"
                    flexDirection="column"
                    gap={2}
                    alignItems="center"
                >
                    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                        <TextField fullWidth variant='outlined' label="Task name" inputRef={taskName} required/>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Deadline" required inputRef={taskDeadline} format='YYYY-MM-DD'/>
                        </LocalizationProvider>
                        <TextField fullWidth multiline variant='outlined' label="Description" inputRef={taskDescription} required/>
                    </Box>
                    <Box display="flex" gap={4}>
                        <Button variant='contained' onClick={handleClose} color="warning" >Close</Button>
                        <Button variant='contained' type='submit'>Add task</Button>
                    </Box>
                </Box>
            </form>
        </CustomModal>
    );
}

export default TaskForm;