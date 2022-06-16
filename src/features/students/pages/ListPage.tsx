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
  setFilterWithDebounce,
} from "../studentSlice";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "./ListPage.css";
import { selectcityMap, selectDataCityList } from "../../city/citySlice";
import StudentFilter from "../components/StudentFilter";
import { Params } from "../../../models";


export default function ListPage() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilterStudentList);
  const studentList = useSelector(selectStudentList);
  const pagination = useSelector(selectPaginationStudentList);
  const loading = useSelector(selectLoadingStudentList);
  const cityMap = useSelector(selectcityMap);
  const cityList = useSelector(selectDataCityList);
  const handlePageChange = (e: any, page: number) => {
    const payload = {
        ...filter,
        _page:page
    }
    dispatch(setFilter(payload))
  };
  const handleSearchChange = (newFilter:Params) => {
     dispatch(setFilterWithDebounce(newFilter))
  }
  const handleSelectChange = (newFilter:Params) => {
    dispatch(setFilter(newFilter))
  }
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
      <Box mb={3} className="boxFilter">
         <StudentFilter filter={filter} cityList={cityList} onSearchChange={handleSearchChange} onSelectChange={handleSelectChange}/>
      </Box>
      <StudentsTable studentList={studentList} cityMap={cityMap}/>
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
