import { Visibility } from '@mui/icons-material';
import { Avatar, AvatarGroup, Badge, Box, Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import "@fontsource/roboto/300.css"
import { memo } from 'react';
import urgencyStyles from '../../../colorPalette';
import { useDispatch } from 'react-redux';
import { showTask } from '../../../actions/taskActions';
function TaskItem({
    name,
    creationDate,
    deadline,
    id,
    urgency,
    members,
    ownerID
}){

    const dispatch = useDispatch();
    const handleOpen = () => dispatch(showTask(id));
    const filterMembers = members.filter(m => m.id != ownerID);

    return (
        <>        
            <Box
                className="task-item"
                sx={{
                    backgroundImage: `linear-gradient(45deg, #fff, #e3e3e3)`,
                    border: `2px solid ${urgencyStyles[urgency].color}`,
                    paddingX: 2,
                    paddingY: 1,
                    borderRadius: 2,
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.10)"
                }}  
                width={{ xs: "150px", sm: "250px" }}
                onClick={handleOpen}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Visibility sx={{ color: `${urgencyStyles[urgency].color}`}}/>
                    {
                        filterMembers.length > 0 
                        ?
                        <AvatarGroup max={4}>
                            {
                                filterMembers.map(m => {
                                    return (
                                        <Tooltip title={m.name} key={m.id}>
                                            <Avatar sx={{ width: "30px", height: "30px" , bgcolor: `${urgencyStyles[urgency].color}`,border: "none"}}>{m.name[0].toUpperCase()}</Avatar>
                                        </Tooltip>
                                    )
                                })
                            }
                        </AvatarGroup>
                        : 
                        <Chip label="No members" />
                    }
                </Stack>
                <Typography variant='h4' fontWeight="300" sx={{overflow: "clip", textOverflow: "ellipsis"}}>{ name }</Typography>
                <Stack direction={{xs: "column", sm: "row"}} alignItems="flex-start" spacing={1}>
                    <Box display="flex" gap={1}>
                        <Typography fontSize="14px">From</Typography>
                        <Chip label={creationDate} size='small'/> 
                    </Box>
                    <Box display="flex" gap={1}>
                        <Typography fontSize="14px">To</Typography>
                        <Chip label={deadline} size='small'/>
                    </Box>
                </Stack>
            </Box>
            {/* {
                open &&
                <CustomModal
                    height={400}
                    open={true}
                    onClose={handleClose}
                >
                    <TaskInfo 
                    />
                </CustomModal>
            } */}
        </>

    );
}

export default memo(TaskItem);