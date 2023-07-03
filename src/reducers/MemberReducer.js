import { MEMBERS } from "../actions/actionsTypes";

const MemberReducer = (state = [], action) => {
    switch(action.type){
        case MEMBERS.LOAD:{
            return action.payload.members
        }
        case MEMBERS.ADD:{
            return [
                ...state,
                action.payload
            ]
        }
        case MEMBERS.DELETE:{
            return state.filter(member => member.id !== action.payload.id);
        }
        case MEMBERS.ADD_TASK_MEMBER:{
            console.log(state);
            return state.map(m => {
                if(m.id === payload.id){
                    m.members += 1;
                }
                return m;
            })
        }
        case MEMBERS.DELETE_TASK_MEMBER:{
            return state.map(m => {
                if(m.id === payload.id){
                    m.members -= 1;
                }
                return m;
            })
        }
        default:
            return state
    }
}

export default MemberReducer