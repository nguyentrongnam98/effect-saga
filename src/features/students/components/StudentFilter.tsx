import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import { city, Params } from "../../../models";
import Select, { SelectChangeEvent } from "@mui/material/Select";
interface StudentFilterProps {
  filter: Params;
  onSearchChange?: (newFilter: Params) => void;
  onSelectChange?: (newFilter: Params) => void;
  cityList: city[];
}
const StudentFilter = ({
  filter,
  onSearchChange,
  onSelectChange,
  cityList,
}: StudentFilterProps) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      name_like: e.target.value,
      _page:1
    };
    onSearchChange(newFilter);
  };
  const handleSelectChange = (e:SelectChangeEvent<any>) => {
    if (!onSelectChange) return
    const newFilter = {
        ...filter,
        _page:1,
        city:e.target.value || null || undefined
    }
    onSelectChange(newFilter)
  }
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="Search by name">Search by name</InputLabel>
            <Input
              id="Search by name"
              endAdornment={<Search />}
              onChange={handleSearchChange}
              defaultValue={filter?.name_like}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={filter.city || ''}
              onChange={handleSelectChange}
            >
                <MenuItem value="">
                   <em>All</em>
                </MenuItem>
                {cityList.map(city => <MenuItem key={city.code} value={city.code}>{city.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentFilter;
