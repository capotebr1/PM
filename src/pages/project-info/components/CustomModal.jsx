import { Box, Modal } from '@mui/material';
import React from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: "10px",
    boxShadow: 24,
    overflowY: "scroll",
    p: 3,
};

function CustomModal({children, open, onClose, height}) {

    return (
        <Modal
            open={open}
            onClose={onClose}
            disableAutoFocus
        >
            <Box sx={style} height={ height }>
                {children}
            </Box>
        </Modal>
    );
}



export default CustomModal;