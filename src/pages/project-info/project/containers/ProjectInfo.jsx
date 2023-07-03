import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Chip, Divider, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import ButtonsPanel from '../../components/ButtonsPanel';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import UserForm from '../../components/UserForm';
import CustomModal from '../../components/CustomModal';
import UserChip from '../../components/UserChip';
import urgencyStyles from '../../../../colorPalette';
import { isUserAdmin } from '../../../../utils/functions';
function dateDiffInDays(b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const d1 = new Date();
    const d2 = new Date(b);
    const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

function ProjectInfo() {

    const { id } = useParams();
    const [ showUserForm, setShowUserForm ] = useState(false);
    const projectSelector = state => state.projects;
    const [project] = useSelector(projectSelector);
    console.log(project);
    const memberSelector = state => state.members;
    const members = useSelector(memberSelector);
    const daysLeft = dateDiffInDays(project.deadline);

    return (
        <Box
            display="flex"
            flexDirection="column"
            bgcolor="white"
            borderRadius={2}
            boxShadow="0px 0px 10px 0px rgba(0,0,0,0.15)"
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                p={2}
            >
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                    
                    <Stack direction="column" spacing={2} >
                        <Typography color="#666">Projects / {project.name[0].toUpperCase() + project.name.slice(1)} </Typography>
                        <Typography gutterBottom variant='h5' color="#333" fontWeight="bold">{project.name[0].toUpperCase() + project.name.slice(1)} </Typography>
                        <Stack direction={{xs: "column", sm: "row"}} spacing={3}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography>
                                    Owner
                                </Typography>
                                <Chip sx={{width: "auto"}} label={project.owner.toUpperCase()} color='primary' variant='contained' avatar={<Avatar>{project.owner[0].toUpperCase()}</Avatar>} />
                            </Stack >
                            <Divider orientation='vertical' flexItem />
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography>
                                    From - To
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Chip label={project.creation_date.slice(0,10)} color="primary"/>
                                    <ArrowForward color='primary'/>
                                    <Chip label={project.deadline.slice(0,10)} color="secondary"/>
                                    <Divider orientation='vertical' flexItem />
                                    <Chip color='warning' label={`${daysLeft} days left`} sx={{bgColor: "#FCBF49"}} />
                                </Stack>
                            </Stack >
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography>
                                Members
                            </Typography>
                            {members.slice(0, 2).map(m => (
                                <UserChip 
                                    key={m.id} 
                                    projectID={project.id} 
                                    memberID={m.id} 
                                    name={m.name} 
                                    ownerID={project.user_id}
                                />
                            ))}
                            {
                                members.slice(2).length > 0 
                                ? <Chip label={`+${members.slice(2).length}`} />
                                : null
                            }
                            {
                                isUserAdmin(project.user_id)
                                ?
                                <IconButton color='primary' sx={{border: "1px solid rgb(150, 208, 255)"}} onClick={() => setShowUserForm(true)}>
                                    <AddIcon color='primary' />
                                </IconButton>
                                : null
                            }
                            
                        </Stack>
                        {project.description &&
                            <Box width="50%" borderRadius={1} border="1px solid #ccc" p={1} sx={{height: "auto",
                                wordBreak: "break-word"}}>
                                <Typography>
                                    {project.description}
                                </Typography>
                            </Box>
                        }
                    </Stack>   
                </Box>
                <Box
                    display="flex"
                    gap={4}
                >
                    { isUserAdmin( project.user_id )
                        ? <ButtonsPanel projectName={project.name} projectID={id}/>
                        : null
                    }
                </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap={2} alignItems="flex-start">
            
                <CustomModal
                    open={showUserForm}
                    onClose={() => setShowUserForm(false)}
                >
                    <UserForm projectID={id} userID={project.user_id}/>
                </CustomModal>
            </Box>
        </Box>
    );
}

export default ProjectInfo;