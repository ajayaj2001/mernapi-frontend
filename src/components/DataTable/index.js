import * as React from "react";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  Paper,
  TableRow,
  TableContainer,
  styled,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function DataTable({
  setOpenModel,
  setModelTitle,
  setFormInitialValue,
  tableData,
}) {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 700, maxHeight: 600 }}>
      <Table stickyHeader aria-label="customized table">
        <caption>Click the edit icon to update the field </caption>
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Age</StyledTableCell>
            <StyledTableCell>About</StyledTableCell>
            <StyledTableCell>Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, i) => {
            return (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.age}</StyledTableCell>
                <StyledTableCell>{row.about}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => {
                      setFormInitialValue({
                        name: row.name,
                        age: row.age,
                        about: row.about,
                        _id: row._id,
                      });
                      setModelTitle("Update Field");
                      setOpenModel(true);
                    }}
                  >
                    <EditSharpIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
