
const BASE_URL = "http://localhost:5000/tasks";

export const getProjectTasks = async (ProjectID) => {
    try {
        const response = await fetch(`${BASE_URL}/${ProjectID}`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

export const postTask = async (name, description, creationDate, deadline ,projectID, priority) => {
    try {
        const request = await fetch(`${BASE_URL}/add` , {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name: name,
                projects_id: projectID,
                urgency_id: priority,
                description: description,
                date: creationDate,
                deadline: deadline
            })
        })
        const response = await request.json();
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const removeTask = async (todoID) => {
    try {
        const request = await fetch(`${BASE_URL}/delete/${todoID}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({ id: todoID })
        })
        console.log(request)
        return request;
    } catch (error) {
        throw new Error(error);
    }
}

export const putTaskName = async (taskID, name) => {
    try {
        const request = await fetch(`${BASE_URL}/toggle/name`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id: taskID,
                name: name
            })
        })
        const response = request.json();
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const putTask = async (todoID, isCompleted) => {
    try {
        const request = await fetch(`${BASE_URL}/toggle`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id: todoID,
                completed: isCompleted
            })
        })
        const response = request.json();
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const putUrgency = async (taskID, urgency) => {
    try {
        const request = await fetch(`${BASE_URL}/toggle/urgency`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                taskID: taskID,
                urgency: urgency
            })
        })
        const response = request.json();
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const putTaskDescription = async (taskID, description) => {
    try {
        const request = await fetch(`${BASE_URL}/toggle/description`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                taskID: taskID,
                description: description
            })
        })
        const response = request.json();
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const postComment = async (taskID, userID, comment, date, time) => {
    try {
        const request = await fetch(`${BASE_URL}/add/comment`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                task_id: taskID,
                user_id: userID,
                comment: comment,
                date: date,
                time: time
            })
        })
        const response = await request.json();
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const getComments = async (taskID) => {
    try {
        const response = await fetch(`${BASE_URL}/comments/${taskID}`);
        const data = await response.json();
        return data
    } catch (error) {
        throw new Error(error);
    }
}