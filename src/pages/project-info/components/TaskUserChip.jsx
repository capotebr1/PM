import React from 'react';

function TaskUserChip({memberID, projectID, name, ownerID}) {
   

    const isAdmin = isUserAdmin(ownerID);
    return (
        <div>
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
        </div>
    );
}

export default TaskUserChip;