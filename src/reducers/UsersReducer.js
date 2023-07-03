import React from 'react';
import { MEMBERS } from '../actions/actionsTypes';

export const UsersReducer = (state = [], action) => {
    switch(action.type){
        // case MEMBERS.LOAD:{
        //     console.log(action.payload.members);
        //     return action.payload.members
        // }
        // case MEMBERS.ADD:{
        //     return [
        //         ...state,
        //         action.payload
        //     ]
        // }
        // case MEMBERS.DELETE:{
        //     return state.filter(member => member.id !== action.payload.id);
        // }
        default:
            return state
    }
}