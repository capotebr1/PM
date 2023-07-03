import { useEffect, useState } from "react";
import { getProject } from "../../../services/ProjectServices";
import { useDispatch } from "react-redux";
import { loadProject } from "../../../actions/projectsActions";
export const useProject = ({id}) => {
    const [ projectData , setProjectData ] = useState();
    const [ loading, setLoading ] = useState(true);

    useEffect( () => {
        getProject(id)
        .then(data => {
            setProjectData(data[0]);
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    }
    , [])
    console.log(projectData);


    return { projectData, loading }
}