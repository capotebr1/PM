import { Typography,Button, TableCell, TableRow } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";

const ProjectListItems = ({ id, name, date, deadline }) => {

  const navigate = useNavigate();

  const handleShowTask = () => {
    navigate(`/project/info/${id}`)
  }

  return (
    <TableRow sx={{
      height: "50px",
      cursor: "pointer",
    }}
      onClick={() => handleShowTask(id)}
      hover
    >
        <TableCell>
          <Typography sx={{lineBreak: "anywhere", fontWeight: "bold"}}>
            {name}
          </Typography>
        </TableCell>
        <TableCell >
          <Typography>
            {date?.slice(0,10)}
          </Typography>
        </TableCell>
        <TableCell >
          <Typography>
            {deadline?.slice(0,10)}
          </Typography>
        </TableCell>
        <TableCell>
          <Button variant="contained" onClick={() => handleShowTask()}> <VisibilityIcon/> </Button>
        </TableCell>
    </TableRow>
  );
};

export default ProjectListItems;
