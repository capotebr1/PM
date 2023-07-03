import { MEMBERS } from "./actionsTypes";

export const loadMembers = (data) => {
    return {
        type: MEMBERS.LOAD,
        payload: { members: data }
    }
}

export const addMember = (id, name, email) => {
    return{
        type: MEMBERS.ADD,
        payload: {
            id: id,
            name: name,
            email: email
        }
    }
}

export const deleteMember = (id) => {
    return {
        type: MEMBERS.DELETE,
        payload: { id: id }
    }
}