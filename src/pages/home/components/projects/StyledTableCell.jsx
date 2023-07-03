import { TableCell } from '@mui/material';
import React from 'react';

const StyledTableCell = ({children , ...props}) => (
    <TableCell sx={{fontWeight: "bold", textAlign: "start"}} {...props} >
      {children}
    </TableCell>
);

export default StyledTableCell;