import { TASKS } from "../actions/actionsTypes";
export const TasksReducer = ( state = { showingTask: -1, tasks: [] }, action ) => {
    switch(action.type){
        case TASKS.LOAD:{
            return { ...state, tasks: action.payload }
        }
        case TASKS.ADD:{
            console.log(action.payload.task);
            console.log(state);
            const newState =  {
                ...state,
                tasks: [
                    ...state.tasks,
                    {
                        ...action.payload.task,
                        members: []
                    }
                ]
            }
            console.log(newState);
            return newState;
        }
        case TASKS.TOGGLE_URGENCY:{
            const newTasks = state.tasks.map( t => {
                if(t.id === action.payload.taskID){
                    t.urgency_id = action.payload.urgency;
                }
                return t;
            })
            return { ...state, tasks: [ ...newTasks ] };
        }
        case TASKS.TOGGLE_NAME: {
            const newTasks = state.tasks.map(t => {
                if(t.id === action.payload.taskID){
                    t.name = action.payload.name
                }
                return t;
            });
            return { ...state, tasks: [ ...newTasks ] };
        }
        case TASKS.TOGGLE_DESCRIPTION:{
            const newTasks = state.tasks.map(t => {
                if(t.id === action.payload.taskID){
                    t.description = action.payload.description;
                }  
                return t;
            })
            return { ...state, tasks: [ ...newTasks ] }
        }
        case TASKS.ADD_MEMBER: {
            const newState = state.tasks.map(t => {
                if(t.id === action.payload.taskID){
                    t.members = [...t.members, action.payload];
                }
                return t;
            })
            return { ...state, tasks: [ ...newState ] };;
        }
        case TASKS.DELETE_MEMBER: {
            const newState = state.tasks.filter(t => {
                if(t.id === action.payload.taskID){
                    t.members = t.members.filter(m => m.id !== action.payload.memberID);
                }
                return t;
            })
            console.log(newState);
            return { ...state, tasks: [ ...newState ] };
        }
        case TASKS.DELETE: {
            const newState = state.tasks.filter(t => t.id !== action.payload.todoID);
            return { ...state, tasks: [ ...newState ] };
        }
        case TASKS.SHOW_TASK:{
            return { ...state, showingTask: action.payload.taskID }
        }
        case TASKS.NOT_SHOW:{
            return { ...state, showingTask: -1 }
        }
        default:
            return state;
    }
}