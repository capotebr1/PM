import "../../styles.css";
import { useDispatch } from "react-redux";
import ProjectList from "./components/projects/ProjectList";
import Navbar from "../../Navbar";
import { CircularProgress, Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllProjects } from "../../services/ProjectServices";
import { loadProject } from "../../actions/projectsActions";
import Cookies from "js-cookie";
import MemberProjects from "./components/projects/MemberProjects";
import { getMemberProjects } from "../../services/MemberServices";
export default function App() {
  const dispatch = useDispatch();                                       
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    const id  = Cookies.get("id");
    
    const getProjects = async () => {
      try {
        const projects = await Promise.all([
          getAllProjects(id),
          getMemberProjects(id)
        ])
        console.log(projects);
        dispatch(loadProject(projects));
      } catch (error) {
        console.error(error)
      }
      finally{
        setLoading(false);
      }
    }
    getProjects();

  } , []);

  if(loading){
    return (
      <CircularProgress/>
    )
  }

  return (
    <div className="App">
      <Navbar/>
      <Grid 
        container
        alignItems="flex-start"
        flexDirection="center"
        display="flex"
        gap={2}
        p={2}
      > 
        <ProjectList/>
        <MemberProjects/>
      </Grid>
    </div>
  );
}
