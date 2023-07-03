import ClearIcon from '@mui/icons-material/Clear';
import { Avatar, Chip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTaskMember } from '../../../services/MemberServices';
import { isUserAdmin } from '../../../utils/functions';
import { deleteTaskMember } from '../../../actions/taskActions';
import urgencyStyles from '../../../colorPalette';
function TaskUserChip({memberID, taskID , name, ownerID, urgency}) {
    const dispatch = useDispatch();
    const [ remove, setRemove ] = useState(false);
    const handleDelete = () => {
        console.log(memberID);
        removeTaskMember(taskID, memberID);
        dispatch(deleteTaskMember(taskID, memberID));
    }
    const isAdmin = isUserAdmin(ownerID);
    return (
        <Chip
            onMouseOver={ isAdmin ? () => setRemove(true) : null } 
            onMouseLeave={() => setRemove(false)} 
            // color='default' 
            sx={{ bgcolor: `${urgencyStyles[urgency].color}`, color: "white", m: "2px"}}
            label={name} 
            avatar={
                <Avatar sx={{ cursor: "pointer", bgcolor: "#666" }} onClick={isAdmin ? handleDelete : null}>
                    {remove ? <ClearIcon fontSize='small' sx={{color: "#fff"}}/> : <Typography color="#fff" fontWeight="bold">{name[0].toUpperCase()}</Typography> }
                </Avatar>
            } 
        />
    );
}

export default TaskUserChip;