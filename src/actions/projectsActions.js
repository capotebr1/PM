import { PROJECTS } from "./actionsTypes"
export const loadProject = (data) => {
    return {
        type: PROJECTS.LOAD,
        payload: { state: data }
    }
}

export const addProject = (id, name, description, date, userID) => {
    return {
        type: PROJECTS.ADD,
        payload: {
            id: id,
            name: name,
            description: description,
            creation_date: date,
            user_id: userID
        }
    }
}

export const editProject = (id, name, description) => {
    console.log("edit")
    return {
        type: PROJECTS.EDIT,
        payload: {
            id: id,
            name: name,
            description: description
        }
    }
}

export const deleteProject = (id) => {
    return {
        type: PROJECTS.DELETE,
        payload: {
            id: id
        }
    }
}