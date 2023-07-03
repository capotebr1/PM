import { Button, TextField } from "@mui/material";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "../../actions/projectsActions";
import { postProject } from "../../services/ProjectServices";
import PROJECT from "../../models/project.class";
import Cookies from "js-cookie";
const ProjectForm = () => {
  const dispatch = useDispatch();
  const projectName = useRef();
  const projectDescription = useRef();
  
  const handleSubmit = e => {
    e.preventDefault();
    const date = new Date().toISOString().slice(0,10);
    const projName = projectName.current.value;
    const projDesc = projectDescription.current.value;
    const id = Cookies.get("id");

    postProject(projName, projDesc, date, id)
    .then(data => dispatch(addProject(data.insertId, projName, projDesc, date, id)));
    
    projectName.current.value = "";
    projectDescription.current.value = "";
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="process-form"
      >
        <TextField variant="filled" label="Project name" required inputRef={projectName} type="text" placeholder="Name" />
        <TextField variant="filled" multiline rows={2} label="Project Description"  inputRef={projectDescription} placeholder="Description"/>        
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ProjectForm;
