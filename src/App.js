import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import EmployerForm from "./EmployerForm";  // Make sure you have EmployerForm.js
import EmployerList from "./EmployerList";  // Make sure you have EmployerList.js
import "./App.css";  // Import the custom CSS for the button

const App = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center", 
      backgroundColor: "#f0f8ff" 
    }}>
      <h1 style={{ marginBottom: "40px", color: "#333" }}>Employer Management System</h1>
      
      {/* Flex container for horizontal alignment */}
      <div className="button-container">
        {/* Add Employee Button */}
        <button
          onClick={() => navigate("/add")}
          className="custom-button"
        >
          Add Employee
        </button>

        {/* View Employees Button */}
        <button
          onClick={() => navigate("/view")}
          className="custom-button"
        >
          View Employees
        </button>
      </div>
    </div>
  );
};

function MainApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<EmployerForm />} />
        <Route path="/view" element={<EmployerList />} />
      </Routes>
    </Router>
  );
}

export default MainApp;