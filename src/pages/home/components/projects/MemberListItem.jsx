import { Visibility } from '@mui/icons-material';
import { Avatar, Button, Chip, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MemberListItem({projectID , name , ownerID , owner}) {
    const navigate = useNavigate();
    const handleShowTask = () => {
        navigate(`/project/info/${projectID}`)
    }

    return (
        <TableRow sx={{
            height: "50px",
            cursor: "pointer",
          }}
            onClick={handleShowTask}
            hover
        >
            <TableCell>
                <Typography fontWeight="bold">
                    {name}
                </Typography>
            </TableCell>
            <TableCell>
                <Chip avatar={<Avatar>{owner[0].toUpperCase()}</Avatar>} label={<Typography>{owner[0].toUpperCase() + owner.substring(1)}</Typography>} variant='outlined' color="primary"/>
            </TableCell>
            <TableCell>
                <Button variant='contained' onClick={handleShowTask}>
                    <Visibility/>
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default MemberListItem;