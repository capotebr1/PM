import { Box, CircularProgress, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ProjectInfo from './project/containers/ProjectInfo';
import Tasks from './tasks/containers/Tasks';
import { useParams } from 'react-router-dom';
import { getProjectTasks } from '../../services/TaskServices';
import { useDispatch, useSelector } from 'react-redux';
import { loadTask, notShowTask } from '../../actions/taskActions';
import Navbar from '../../Navbar';
import { getProject } from '../../services/ProjectServices';
import { loadProject } from '../../actions/projectsActions';
import { getMemberTasks, getProjectMembers } from '../../services/MemberServices';
import { loadMembers } from '../../actions/memberActions';
import Cookies from 'js-cookie';
import { isUserAdmin } from '../../utils/functions';
import TaskInfo from './tasks/TaskInfo';
import useProject from './project/hooks/useProject';
import CustomModal from './components/CustomModal';
function Project() {
    const { id } = useParams(); // ProjectID
    const dispatch = useDispatch();
    const [ loading ] = useProject(Number(id));
    const showTaskSelector = state => state.tasks.showingTask;
    const showTask = useSelector(showTaskSelector);
    console.log(showTask);
    if(loading){
        console.log("loading...")
        return (
            <CircularProgress/>
        )
    }

    return (
        <Box ml="130px">
            <Navbar/>
            <Box p={3} display="flex" flexDirection="column" gap={3}>
                <ProjectInfo/>
                <Tasks/>
            </Box>
            <CustomModal
                open={ showTask !== -1 }
                height={400}
                onClose={() => dispatch( notShowTask() )}
            >
                <TaskInfo/>
            </CustomModal>
        </Box>
    );
}

export default Project;