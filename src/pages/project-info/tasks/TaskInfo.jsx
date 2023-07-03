import { Autocomplete, Box, Chip, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import { postTaskMember } from '../../../services/MemberServices';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Delete, GroupAdd } from '@mui/icons-material';
import { CalendarIcon } from '@mui/x-date-pickers';
import { putTaskDescription, putTaskName, putUrgency, removeTask } from '../../../services/TaskServices';
import { deleteTask, notShowTask, toggleTaskDescription, toggleTaskName, toggleUrgency } from '../../../actions/taskActions';
import TaskComments from './TaskComments';
import Cookies from 'js-cookie';
import { addTaskMember } from '../../../actions/taskActions';
import EditIcon from '@mui/icons-material/Edit';
import TaskUserChip from './TaskUserChip';
import { isUserAdmin } from '../../../utils/functions';
import urgencyStyles from '../../../colorPalette';
function TaskInfo() {
    
    const dispatch = useDispatch();

    const [ showUrgency, setShowUrgency ] = useState(false);
    const [ openMembers, setOpenMembers ] = useState(false);
    const [ editName, setEditName ] = useState(false);

    const membersSelector = state => state.members;
    const projectMembers = useSelector(membersSelector);

    const taskSelector = state => state.tasks.tasks.filter( t => t.id === state.tasks.showingTask );
    const [ task ] = useSelector(taskSelector)
    const { id, name, description, deadline, creation_date, urgency_id, members, ownerID } = task;
    const urgency = urgency_id - 1;
    const taskMembers = members.filter(m => m.id !== ownerID);
    const taskMembersIDs = taskMembers.map(m => m.id);
    const filterMembers = projectMembers.filter(m => !taskMembersIDs.includes(m.id));

    const handleChange = (event, value) => {
        console.log(value);
        if(value != null){
            postTaskMember( id, value.id, ownerID );
            dispatch(addTaskMember(id, value.id , value.name));
        }
        setOpenMembers(false)
    }

    const handelName = (event) => {
        const newName = event.target.value;
        if(newName !== name){
            putTaskName(id, newName);
            dispatch(toggleTaskName(id, newName));
        }
        setEditName(false)
    }

    const handleDelete = () => {
        try{
            removeTask(id);
            dispatch(deleteTask(id));
            dispatch(notShowTask());
        }
        catch(error){
            console.log(error)
        }
    }

    const handleDescription = (e) => {
        if(e.target.value !== description){
            putTaskDescription(id, e.target.value);
            dispatch(toggleTaskDescription(id, e.target.value));
        }
    }

    const handleUrgency = (newUrgency) => {
        putUrgency( id, newUrgency )
        dispatch(toggleUrgency(id, newUrgency));
    }

    return (
        <Stack direction="row" alignItems="flex-start" justifyContent="center" gap={4}>
            <Box display="flex" flexDirection="column" alignItems="flex-start" gap={2}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                    {
                        editName ?
                        <TextField size='small' defaultValue={name} onBlur={e => handelName(e)}/>
                        : <Typography variant='h5' fontWeight="bold">{name}</Typography>
                    }
                    {
                    isUserAdmin(ownerID) &&
                    <IconButton onClick={() => setEditName(!editName)}>
                        <EditIcon/>
                    </IconButton>
                    }
                </Stack>
                <Box width="100%" height={10} bgcolor={urgencyStyles[urgency].color} borderRadius={10}></Box>
                <Stack direction="row" spacing={1}>
                    <Typography>From - to</Typography>
                    <Chip icon={<CalendarIcon/>} label={ <Typography fontWeight="bold">{creation_date} - {deadline}</Typography> } />
                </Stack>
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography>Status: </Typography>
                    <Chip 
                        sx={{ bgcolor: urgencyStyles[urgency].color }} 
                        label={urgencyStyles[urgency].urgency} 
                        onClick={ Cookies.get("id") == ownerID ? () => setShowUrgency(!showUrgency) : () => {}}
                    />
                    
                    { showUrgency &&
                        urgencyStyles.map((u, index) => 
                            (
                                index !== urgency 
                                ? 
                                <Chip key={u.urgency} sx={{bgcolor: u.color}} label={u.urgency} onClick={() => handleUrgency(index + 1)}/> 
                                : null
                            )
                        )
                    }
                </Box>
                <TextField 
                    fullWidth 
                    multiline 
                    label="description" 
                    defaultValue={description}
                    onBlur={ isUserAdmin(ownerID) ? handleDescription : null}
                    InputProps={{
                        readOnly: !isUserAdmin(ownerID),
                    }}
                />
                <Paper variant="outlined" sx={{width: "100%", p: 1}}>  
                    <Typography gutterBottom fontWeight="bold">Members:</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        {
                            taskMembers.length === 0
                            ? <Chip label="No members added yet..." />
                            : <Stack direction="row" alignItems="center" flexWrap="wrap">
                                {
                                    taskMembers.map((m) => (
                                            <TaskUserChip
                                                key={m.id}
                                                taskID={id}
                                                memberID={m.id}
                                                name={m.name}
                                                ownerID={ownerID}
                                                urgency={urgency}
                                            />
                                    ))
                                }
                            </Stack>
                        }
                        {
                            isUserAdmin(ownerID) &&
                            <IconButton sx={{ color: `${urgencyStyles[urgency].color}` }} onClick={() => setOpenMembers(!openMembers)}>
                                <GroupAdd />
                            </IconButton>
                        }
                    </Stack>
                    {
                        openMembers &&
                        <Autocomplete
                            fullWidth
                            onChange={(event, value) => handleChange(event, value)}
                            id="tags-outlined"
                            options={filterMembers}
                            getOptionLabel={(option) => option.name}
                            filterSelectedOptions
                            readOnly={ Cookies.get("id") != ownerID}
                            sx={{mt:1}}
                            renderInput={(params) => (
                                <TextField
                                    color='info'
                                    {...params}
                                    label="Task Members"
                                    placeholder={taskMembers.length === 0 ? "Add members" : "Members"}
                                />
                            )}
                        />
                    }
                </Paper>
                {
                    Cookies.get("id") == ownerID
                    ? 
                    <Stack direction="row" spacing={2} >
                        <IconButton color='warning' onClick={handleDelete}>
                            <Delete/>
                        </IconButton>
                    </Stack>
                    : null
                }
                
            </Box>
            <TaskComments id={id}/>
        </Stack>
    );
}

export default TaskInfo;