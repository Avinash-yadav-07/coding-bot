import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import EmployerForm from "./EmployerForm";  
import EmployerList from "./EmployerList";  
import "./App.css";  


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
      
      <img 
        src="https://trufe.com/wp-content/uploads/2024/09/Untitled-design-1.png" 
        alt="Employer Management Logo" 
        style={{ width: "200px", marginBottom: "30px" }} 
      />

      
      <h1 style={{ marginBottom: "40px", color: "#333" }}>Employer Management System</h1>
      
    
      <div className="button-container">
        
        <button
          onClick={() => navigate("/add")}
          className="custom-button"
        >
          Add Employee
        </button>

        
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
