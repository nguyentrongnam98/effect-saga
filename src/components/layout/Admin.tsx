import React from "react";
import "./Admin.css";
import Box from "@mui/material/Box";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "../../features/dashboard";
import Students from "../../features/students";
import Main from "../common/Main";
function Admin() {
  return (
    <Box className="root">
      <Box className="header">
        <Header />
      </Box>
      <Box className="sidebar">
        <Sidebar />
      </Box>
      <Box className="main">
        <Outlet/>
      </Box>
    </Box>
  );
}

export default Admin;
