import { Add, GroupAdd, Search } from '@mui/icons-material';
import { Autocomplete, Box, IconButton, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { getProjectMembers } from '../../../services/MemberServices';
import { useParams } from 'react-router-dom';

function MembersForm({taskMembers, handleAddMember}) {
    const { id } = useParams();
    const [ users, setUsers ] = useState([]);
    const [ user, setUser ] = useState(null);
    const handleChange = (event, value) => {
        if(value && value.id){
            setUser(value);
        }
    }

    useEffect(() => {
        console.log("Miembros de la tarea:");
        console.log(taskMembers);
        getProjectMembers(id)
        .then(data => {
            console.log("Miembros del proyecto");
            console.log(data);
            const filterMembers = [];
            data.forEach(u => {
                const isInTask = taskMembers.findIndex(m => m.id === u.id);
                if(isInTask === -1){
                    filterMembers.push(u);
                }
            });
            console.log("Miembros filtrados:");
            console.log(filterMembers);
            setUsers(filterMembers);
        })
    }, [taskMembers])

    return (
        <Box mt={2} display="flex" justifySelf="flex-end" alignSelf="flex-end" gap={1}>
            <Autocomplete 
                onChange={(event, value) => handleChange(event, value)}
                options={users}
                value={user}
                size='small' 
                renderInput={(params) => <TextField {...params}
                    placeholder='example@user.com'
                    sx={{width: 250}} 
                    variant='outlined' 
                    label="Search member"
                    autoFocus
                />}
            />
            {
                user 
                && 
                <IconButton onClick={() => {
                    setUser("");
                    handleAddMember(user);
                }}>
                    <Add/>
                </IconButton>
            }   
        </Box>
    );
}

export default MembersForm;