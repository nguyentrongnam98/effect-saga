import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiStudent from "../../../api/studentApi";
import { student } from "../../../models";
import StudentForm from "../components/StudentForm";

export default function AddEditPage() {
  const [student, setStudent] = React.useState<student>();
  const navigate = useNavigate();
  const { studentId } = useParams();
  const iEdit = Boolean(studentId);

  React.useEffect(() => {
    if (!iEdit) return;
    (async function () {
      try {
        const data: student = await apiStudent.getStudentById(studentId);
        setStudent(data);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [studentId]);
  const initialValue: student = {
    name: "",
    age: 0,
    city: "",
    gender: "male",
    mark: 0,
    ...student,
  } as student;

  const handleFormSubmit = async (formValue: student) => {
    if (iEdit) {
       await apiStudent.updateStudent(formValue)
    } else {
       await apiStudent.addStudent(formValue)
    }
    // throw new Error('CLGT')
    toast.success('🦄 Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    navigate(-1)
  };
  return (
    <Box>
      <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
        Go back
      </Button>
      <Box style={{ marginTop: 20 }}>
        <Typography variant="h4">
          {iEdit ? "Edit a student" : "Add new student"}
        </Typography>
      </Box>

      {(!iEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm
            initialValue={initialValue}
            onSubmit={handleFormSubmit}
          />
        </Box>
      )}
    </Box>
  );
}
