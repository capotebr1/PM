import ClearIcon from '@mui/icons-material/Clear';
import { Avatar, Chip } from '@mui/material';
import React, { useState } from 'react';
import { deleteMember } from '../../../actions/memberActions';
import { useDispatch } from 'react-redux';
import { removeProjectMember } from '../../../services/MemberServices';
import Cookies from 'js-cookie';
import { isUserAdmin } from '../../../utils/functions';

function UserChip({memberID, projectID , name, ownerID}) {
    const dispatch = useDispatch();
    const [ remove, setRemove ] = useState(false);
    const handleDelete = () => {
        removeProjectMember(projectID, memberID)
        .then(data => {
            console.log(data);
            dispatch(deleteMember(memberID));
        })
    }
    const isAdmin = isUserAdmin(ownerID);
    return (
        <Chip
            onMouseOver={ isAdmin ? () => setRemove(true) : null } 
            onMouseLeave={() => setRemove(false)} 
            color='info' 
            label={name} 
            avatar={
                <Avatar sx={{ cursor: "pointer" }} onClick={isAdmin ? handleDelete : null}>
                    {remove ? <ClearIcon fontSize='small'/> : name[0].toUpperCase() }
                </Avatar>
            } 
        />
    );
}

export default UserChip;