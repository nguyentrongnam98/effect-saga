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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export interface StudentsTableProps {
  studentList: student[];
  cityMap:any;
  onEdit?: (studen:student) => void;
  onRemove?: (studen:student) => void;
}
export default function StudentsTable({
  studentList,
  cityMap,
  onEdit,
  onRemove,
}: StudentsTableProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedStudent,setSelectedStudent] = React.useState<student>()

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemove = (student?:student) => {
    setSelectedStudent(student)
    setOpen(true)
  }
  const handleRemoveConfirm = (student:student) => {
      onRemove?.(student)
      setOpen(false)
  }
  return (
    <>
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
              <TableCell align="left">{cityMap[student?.city]?.name}</TableCell>
              <TableCell align="left">
                <Button
                  color="primary"
                  variant="contained"
                  className="mtr"
                  onClick={() => onEdit?.(student)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemove(student)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remove student"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student named {selectedStudent?.name}.<br/> This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">Cancel</Button>
          <Button onClick={() => handleRemoveConfirm(selectedStudent as student)} autoFocus color="secondary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}
