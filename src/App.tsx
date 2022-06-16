import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import Admin from "./components/layout/Admin";
import NotFound from "./components/common/NotFound";
import PrivateRoute from "./components/common/PrivateRoute";
import Students from "./features/students";
import  Dashboard  from "./features/dashboard";
import AddEditPage from "./features/students/pages/AddEditPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="students/*" element={<Students />}>
            <Route path="add" element={<AddEditPage/>}/>
            <Route path=":studentId" element={<AddEditPage/>}/>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
