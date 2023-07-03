import React, { useEffect, useState } from 'react';
import { getProject } from '../../../../services/ProjectServices';
import { getMemberTasks, getProjectMembers } from '../../../../services/MemberServices';
import { getProjectTasks } from '../../../../services/TaskServices';
import { loadTask } from '../../../../actions/taskActions';
import { loadProject } from '../../../../actions/projectsActions';
import { loadMembers } from '../../../../actions/memberActions';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { isUserAdmin } from '../../../../utils/functions';

function useProject(id) {
    console.log(id);
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const [project, members] = await Promise.all([
                    getProject(id),
                    getProjectMembers(id)
                ]);
                let tasks;
                if(isUserAdmin(project[0].user_id)){
                    tasks = await getProjectTasks(id);
                }
                else{
                    tasks = await getMemberTasks(Cookies.get("id"), id)
                }
                console.log(tasks);
                console.log(project);
                dispatch(loadTask(tasks));
                dispatch(loadProject(project));
                dispatch(loadMembers(members));
            }
            catch(error){
                throw new Error(error);
            }
            finally{
                setLoading(false);   
            }
        }
        fetchData();
    } , [])

    return [ loading ]

}

export default useProject;