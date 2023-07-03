import { TASKS } from "./actionsTypes";
export const loadTask = (data) => {
    return{
        type: TASKS.LOAD,
        payload: data
    }
}

export const addTask = (task) => {
    console.log("Añadir Tarea");
    return{
        type: TASKS.ADD,
        payload: { task: task }
    }
}

export const toggleTask = (taskID, isCompleted) => {
    return{
        type: TASKS.EDIT,
        payload:{
            todoID: taskID,
            isCompleted: isCompleted
        }
    }
}

export const toggleTaskName = (taskID, name) => {
    return {
        type: TASKS.TOGGLE_NAME,
        payload: {
            taskID: taskID,
            name: name
        }
    }
}

export const toggleTaskDescription = (taskID, description) => {
    return {
        type: TASKS.TOGGLE_DESCRIPTION,
        payload: {
            taskID: taskID,
            description: description
        }
    }
}

export const toggleUrgency = (taskID, urgency) => {
    return{
        type: TASKS.TOGGLE_URGENCY,
        payload:{
            taskID: taskID,
            urgency: urgency
        }
    }
}

export const deleteTask = (todoID) => {
    return{
        type: TASKS.DELETE,
        payload:{   
            todoID: todoID
        }
    }
}

export const changeName = (name) => {
    return{
        type: TASKS.CHANGE_NAME,
        payload:{
            name: name
        }
    }
}

export const changeVisibility = (show = false) => {
    return{
        type: TASKS.CHANGE_VISIBILITY,
        payload: show
    }
}

export const addTaskMember = (taskID, memberID, name) => {
    return{
        type: TASKS.ADD_MEMBER,
        payload: {
            id: memberID,
            taskID: taskID,
            name: name
        }
    }
} 

export const deleteTaskMember = ( taskID, memberID ) => {
    return {
        type: TASKS.DELETE_MEMBER,
        payload: {
            memberID: memberID,
            taskID: taskID
        }
    }
}

export const showTask = (taskID) => {
    return {
        type: TASKS.SHOW_TASK,
        payload: {
            taskID: taskID
        }
    }
}

export const notShowTask = () => {
    return {
        type: TASKS.NOT_SHOW,
        payload: -1
    }
}