import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadProject } from "../../../actions/projectsActions";
import { getAllProjects } from "../../../services/ProjectServices";

const useProjects = () => {
    const dispatch = useDispatch();
    const [ editProject, setEditProject ] = useState(-1);

    const handleEdit = (id = -1) => {
      setEditProject(id);
    }
    
    return [ editProject, handleEdit ];
}

export default useProjects;