import { Box , Button, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import StyledTableCell from "./StyledTableCell";
import MemberListItem from "./MemberListItem";

function MemberProjects(props) {

  const projectSelector = state => state.projects[1];
  const projects = useSelector(projectSelector);
  console.log(projects);

  return (
    <Grid item sm={8}>
      <Box
        sx={{
          bgcolor:"white",
          borderRadius: 2,
          boxShadow:"0px 0px 10px 0px rgba(0,0,0,0.15)",
          p: 2,
          maxHeight: "450px",
        }}>
        <Typography gutterBottom variant="h5" color="#666" fontWeight="bold"> Projects where i'm involved </Typography>
        <Divider/>
        { projects.length > 0
          ?
          <Paper variant="outlined" sx={{mt: 2}}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow sx={{fontWeight: "bold", backgroundColor: "#999"}}>
                    {["Project" , "Owner", "See Project"]
                    .map( (header, index) => <StyledTableCell key={index}>{header}</StyledTableCell> )}
                  </TableRow>
                </TableHead>
                  <TableBody>
                    {
                      projects.map(p => (
                        <MemberListItem  
                          key={p.project_id}
                          projectID={p.project_id}
                          name={p.name}
                          ownerID={p.ownerID}
                          owner={p.owner}
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
}

export default MemberProjects;