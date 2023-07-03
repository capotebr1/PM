
const BASE_URL = "http://localhost:5000/members";

// Return members of the indicated PROJECT
export const getProjectMembers = async (projectID) => {
    try{
        const response = await fetch(`${BASE_URL}/project/${projectID}`);
        const data = await response.json();
        return data;
    }
    catch(err){
        throw new Error(err);
    }
}

export const getMemberTasks = async (userID, projectID) => {
    try{
        const response = await fetch(`${BASE_URL}/member/${userID}/tasks/${projectID}`);
        const data = await response.json();
        return data;
    }
    catch(err){
        throw new Error(err);
    }
}

export const getMemberProjects = async (userID) => {
    try {
        const response = await fetch(`${BASE_URL}/member/projects/${userID}`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(err);
    }
}

export const getTaskMembers = async (taskID) => {
    try{
        const response = await fetch(`${BASE_URL}/task/${taskID}`);
        const data = await response.json();
        return data;
    }
    catch(err){
        throw new Error(err);
    }
}

export const postTaskMember = async ( taskID, userID, ownerID ) => {
    try{
        const request = await fetch(`${BASE_URL}/add/task`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                task_id: taskID,
                user_id: userID,
                task_owner: ownerID
            })
        });
        return request;
    }
    catch(err){
        throw new Error(err);
    }
}

export const removeTaskMember = async (taskID, userID) => {
    try {   
        const request = await fetch(`${BASE_URL}/task/delete`,{
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                taskID: taskID,
                userID: userID
            })
        }
        
        );
        return request;
    } catch (err) {
        throw new Error(err)
    }
}

export const addProjectMember = async (projectID, userID) => {
    try{
        const response = await fetch(`${BASE_URL}/add/project`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                project_id: projectID,
                user_id: userID
            })
        });
        const data = await response.json();
        return data;
    }
    catch(err){
        throw new Error(err);
    }
}

export const removeProjectMember = async (projectID, userID) => {
    console.log(projectID);
    console.log(userID);
    try{
        const response = await fetch(`${BASE_URL}/delete/project`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                project_id: projectID,
                user_id: userID
            })
        });
        return response;
    }
    catch(err){
        throw new Error(err);
    }
}