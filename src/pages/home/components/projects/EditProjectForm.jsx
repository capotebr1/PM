import { TextField, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { editProject } from '../../actions/projectsActions';
import { updateProject } from '../../services/ProjectServices';
import { changeName } from '../../actions/processActions';
function EditProjectForm({id , handleEdit}) {
    const dispatch = useDispatch();
    
    const selectProject = state => state.projects.filter(p => p.id === id);
    const [ selectedProject ] = useSelector(selectProject);

    const projectName = useRef();
    const projectDescription = useRef();

    const handleSubmit = e => {
        e.preventDefault();
        const projName =  projectName.current.value;
        const projDescription =  projectDescription.current.value;
        
        updateProject( id, projName, projDescription );
        dispatch(editProject(id, projName, projDescription));
        dispatch(changeName(projName));
        handleEdit();
    }

    return (
        <Box sx={{
            mt: 2
        }}>
            <div>
            <form onSubmit={handleSubmit} className="process-form">
                <TextField inputRef={projectName} type="text" placeholder={selectedProject.name}/>
                <TextField multiline inputRef={projectDescription} placeholder={selectedProject.description}/>        
                <Button type="submit" color='secondary' variant="contained">
                    Update
                </Button>
            </form>
            </div>
        </Box>
    );
}

export default EditProjectForm;