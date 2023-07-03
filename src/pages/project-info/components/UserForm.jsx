import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputLabel, Paper, TextField, Typography, createFilterOptions } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { addProjectMember, getProjectMembers } from '../../../services/MemberServices';
import { getUser, getUsers } from '../../../services/UserServices';
import Cookies from 'js-cookie';
import { AccountCircle, ArrowBack, Email, GroupAdd, Search } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addMember } from '../../../actions/memberActions';

function UserForm({ projectID , userID}) {
    
    const [ availableUsers, setAvailableUsers ] = useState([]);
    const memberSelector = state => state.members;
    const members = useSelector(memberSelector);
    const dispatch = useDispatch();
    const [ value, setValue] = useState(null);
    const [ user, setUser ] = useState();
    const [ open, setOpen ] = useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getUsers();
                const membersID = members.map(m => m.id);
                membersID.push(userID);
                const filterUsers = users
                .filter(u => !membersID.includes(u.id))
                .map(u => ({...u, label: `${u.name} | ${u.email}`}));
                setAvailableUsers(filterUsers);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUsers();
    }, [])

    const handleAddUser = () => {
        const { id, name, email } = user;
        addProjectMember(projectID, id)
        .then(data => {
            setValue(null);
            console.log(availableUsers);
            dispatch(addMember(id, name, email));
            setAvailableUsers(availableUsers.filter(u => u.id !== id));
            handleClose();
        })
    }

    const handleChange = (event, value) => {
        setValue(value);
        console.log(value);
        if(value != null){
            setUser(value);
            handleOpen();
        }
        else{
            handleClose();
        }
    }

    return (
        <Paper
            variant='outlined'
            sx={{p: 2, display: "flex", alignItems: "center", gap: 2}}
        >
                <Autocomplete
                    onChange={(event, value) => handleChange(event, value)} // prints the selected value
                    options={availableUsers}
                    value={value}
                    renderInput={(params) => <TextField {...params}
                        sx={{width: 350}} 
                        variant='outlined' 
                        label="Add member"
                        autoFocus
                        placeholder='example@gmail.com'
                    />}
                />
                {
                    open &&
                    <IconButton color="primary" onClick={handleAddUser}> 
                        <GroupAdd color="primary" />
                    </IconButton>
                }
            
        </Paper>
    );
}

export default UserForm;