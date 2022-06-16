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
import React, { ChangeEvent, useRef } from "react";
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
  const searchRef = useRef<HTMLInputElement>()
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  };
  const handleSelectChange = (e: SelectChangeEvent<any>) => {
    if (!onSelectChange) return;
    const newFilter = {
      ...filter,
      _page: 1,
      city: e.target.value || null || undefined,
    };
    onSelectChange(newFilter);
  };
  const handleSortChange = (e: SelectChangeEvent<any>) => {
    if (!onSelectChange) return;
    const value = e.target.value
    const [_sort,_order] = value.split('.')
    const newFilter = {
      ...filter,
      _sort: _sort || undefined,
      _order: _order || undefined
    };
    onSelectChange(newFilter);
  }
  const handleClearFilter = () => {
    if (!onSelectChange) return;
    const newFilter = {
      ...filter,
      _page:1,
      _sort:undefined,
      _order:undefined,
      city:undefined,
      name_like:undefined
    };
    onSelectChange(newFilter);
    if (searchRef.current) {
      searchRef.current.value = ''
    }
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
              inputRef={searchRef}
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
              value={filter.city || ""}
              onChange={handleSelectChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="sortBy"
              id="demo-simple-select"
              label="Age"
              value={filter?._sort ? `${filter._sort}.${filter._order}` : ""}
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">MARK ASC</MenuItem>
              <MenuItem value="mark.desc">MARK DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
           <Button variant="outlined" color="primary" onClick={handleClearFilter}>Clear</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentFilter;
