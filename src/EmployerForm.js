import React, { useState } from "react";
import { db } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";

const EmployerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    address: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "employers"), formData);
      setFormData({
        name: "",
        age: "",
        city: "",
        address: "",
        department: "",
      });
      alert("Employer added successfully!");
    } catch (error) {
      console.error("Error adding employer:", error);
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Add Employer Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Add Employer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default EmployerForm;