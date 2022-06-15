import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { student } from "../../../models";
import { Button } from "@mui/material";
import "./table.css";
import { capitalizeStr, getMarkColor } from "../../../ultils";
import { Box } from "@mui/system";
export interface StudentsTableProps {
  studentList: student[];
  onEdit?: () => void;
  onRemove?: () => void;
}
export default function StudentsTable({
  studentList,
  onEdit,
  onRemove,
}: StudentsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" sx={{ maxWidth: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList?.map((student, idx) => (
            <TableRow
              key={student.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {student.id}
              </TableCell>
              <TableCell align="left">{student.name}</TableCell>
              <TableCell align="left">
                {capitalizeStr(student.gender)}
              </TableCell>
              <TableCell align="left">
                <Box color={getMarkColor(student.mark)}>{student.mark}</Box>
              </TableCell>
              <TableCell align="left">{student.city}</TableCell>
              <TableCell align="left">
                <Button
                  color="primary"
                  variant="contained"
                  className="mtr"
                  onClick={() => onEdit?.()}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onRemove?.()}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
