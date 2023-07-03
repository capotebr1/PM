import { Add } from '@mui/icons-material';
import { Divider, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { isUserAdmin } from '../../../utils/functions';
import urgencyStyles from '../../../colorPalette';
function TaskColumnHeader({ urgency, color, owner, handleShow, index }) {
    return (
        <Stack 
            direction="row" 
            alignItems="center"
            justifyContent="space-evenly"
            mb={2} 
            borderRadius={2} 
            border={`2px solid ${color} `}
            className='task-header'
        >
            <Typography fontWeight="bold" color={color}>
                {urgency}
            </Typography>
            { isUserAdmin(owner) && 
                <>
                    <Divider orientation='vertical' flexItem/>
                    <IconButton size='small' onClick={() => handleShow(index + 1)} sx={{color: urgencyStyles[index].color}}>
                        <Add/>
                    </IconButton>
                </>
            }
        </Stack>
    );
}

export default TaskColumnHeader;