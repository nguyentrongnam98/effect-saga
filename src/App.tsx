import React from "react";
import "./App.css";
import apiCity from "./api/cityApi";
import apiStudent from "./api/studentApi";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import Admin from "./components/layout/Admin";
import NotFound from "./components/common/NotFound";
import PrivateRoute from "./components/common/PrivateRoute";
function App() {
  React.useEffect(() => {
    apiCity
      .getAll({ _limit: 10, _page: 1 })
      .then((res) => console.log(res.pagination?._limit));
    apiStudent
      .getAll({ _limit: 10, _page: 1 })
      .then((res) => console.log(res.data));
  }, []);
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
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
