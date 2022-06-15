import { Box, Button, LinearProgress, Typography } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentsTable from "../components/StudentsTable";
import {
  fetchStudentList,
  selectFilterStudentList,
  selectLoadingStudentList,
  selectPaginationStudentList,
  selectStudentList,
  setFilter,
} from "../studentSlice";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "./ListPage.css";

export default function ListPage() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilterStudentList);
  const studentList = useSelector(selectStudentList);
  const pagination = useSelector(selectPaginationStudentList);
  const loading = useSelector(selectLoadingStudentList)
  const handlePageChange = (e: any, page: number) => {
    const payload = {
        ...filter,
        _page:page
    }
    dispatch(setFilter(payload))
  };
  React.useEffect(() => {
    dispatch(fetchStudentList(filter));
  }, [filter]);

  return (
    <Box className="ListPageContainer">
        {loading && <LinearProgress/>}
      <Box className="titleBox">
        <Typography variant="h4">Students</Typography>
        <Button color="primary" variant="contained">
          Add new student
        </Button>
      </Box>
      <StudentsTable studentList={studentList} />
      <Box className="paginationBox">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(pagination?._totalRows / pagination?._limit)}
            color="primary"
            onChange={handlePageChange}
            page={pagination?._page}
          />
        </Stack>
      </Box>
    </Box>
  );
}
