import { Button, Tooltip } from '@mui/material';
import React from 'react';

function StyledButton({children, tooltip, color, onClick}) {

    return (
        <Tooltip title={tooltip}>
            <Button variant='contained' onClick={onClick} color={color}> {children} </Button>
        </Tooltip>
    );
}

export default StyledButton;