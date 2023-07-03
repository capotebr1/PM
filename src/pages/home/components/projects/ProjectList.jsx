import ProjectListItems from "./ProjectListItems";
import { Box , Button, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import StyledTableCell from "./StyledTableCell";

const ProjectList = () => {
  const navigate = useNavigate();
  const projectSelector = state => state.projects;
  const [ projects ] = useSelector(projectSelector);
  console.log(projects)
  const handleClick = () => navigate("/project/add");

  return (
    <Grid item sm={8} xs="auto">  
      <Box
        sx={{
          bgcolor:"white",
          borderRadius: 2,
          boxShadow:"0px 0px 10px 0px rgba(0,0,0,0.15)",
          p: 2,
          maxHeight: "450px",
        }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" color="#666" fontWeight="bold" gutterBottom>My projects</Typography>
          <Box display="flex" alignItems="center" gap={2}> 
            <Button variant="outlined" onClick={handleClick}> Add project </Button>
          </Box>
        </Box>
        <Divider/>
        { projects.length > 0
          ?
          <Paper variant="outlined" sx={{mt: 2}}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow sx={{fontWeight: "bold", backgroundColor: "#999"}}>
                    {["Project" , "Created Date", "Deadline", "See Project"]
                    .map( (header, index) => <StyledTableCell key={index}>{header}</StyledTableCell> )}
                  </TableRow>
                </TableHead>
                  <TableBody>
                    {
                      projects.map(p => (
                          <ProjectListItems 
                            key={p.id}
                            id={p.id}
                            description={p.description}
                            name={p.name}
                            deadline={p.deadline}
                            date={p.creation_date}
                          />
                      ))
                    }
                  </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          : <Typography mt={2} color="#777" textAlign="center">No projects added...</Typography>
        }
        
      </Box>
    </Grid>
  );
};

export default ProjectList;
