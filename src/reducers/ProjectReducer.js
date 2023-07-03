import { PROJECTS } from "../actions/actionsTypes";
export const ProjectReducer = (state = [], action) => {
  switch (action.type) {
    case PROJECTS.LOAD:
      return action.payload.state;
    case PROJECTS.ADD:
      const {id, name, description, creation_date, user_id, deadline} = action.payload
      return [
        ...state,
        {
          id: id,
          name: name,
          description: description,
          creation_date: creation_date,
          user_id: user_id,
          deadline: deadline
        }
      ];
    case PROJECTS.EDIT: {
      console.log(action.payload);
      return state.map(p => {
        if(p.id === action.payload.id){
          p.name = action.payload.name,
          p.description = action.payload.description
        }
        return p;
      })
    }
    default:
      return state;
  }
};
