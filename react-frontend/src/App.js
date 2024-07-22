import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListEmployeeComponents from "./components/ListEmployeeComponents";
import CreateOrUpdateEmployeeComponent from "./components/CreateOrUpdateEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import "./App.css"; // Import the CSS file here
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";

const App = () => {
  return (
    <Router>
      <HeaderComponent />
      <div className="container">
        <Routes>
          <Route path="/" element={<ListEmployeeComponents />} />
          <Route path="/employees" element={<ListEmployeeComponents />} />
          <Route
            path="/add-employee/:id"
            element={<CreateOrUpdateEmployeeComponent />}
          />
          <Route
            path="/view-employee/:id"
            element={<ViewEmployeeComponent />}
          />
          <Route
            path="/update-employee/:id"
            element={<CreateOrUpdateEmployeeComponent />}
          />
        </Routes>
      </div>
      <FooterComponent />
    </Router>
  );
};

export default App;
