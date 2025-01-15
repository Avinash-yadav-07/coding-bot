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
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

const EmployerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    address: "",
    department: "",
    email: "",
    phone: "",
    joiningDate: "",
    position: "",
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

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
        email: "",
        phone: "",
        joiningDate: "",
        position: "",
      });
      setSnackbar({ open: true, message: "Employer added successfully!", severity: "success" });
    } catch (error) {
      console.error("Error adding employer:", error);
      setSnackbar({ open: true, message: "Failed to add employer.", severity: "error" });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
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
            {/* Name */}
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
            {/* Age */}
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
            {/* City */}
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
            {/* Address */}
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
            {/* Department */}
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
            {/* Email */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                helperText="Enter a valid email address"
              />
            </Grid>
            {/* Phone */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                inputProps={{ pattern: "[0-9]{10}" }}
                helperText="Enter a 10-digit phone number"
              />
            </Grid>
            {/* Joining Date */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Joining Date"
                name="joiningDate"
                type="date"
                value={formData.joiningDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            {/* Position */}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                select
                required
              >
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Designer">Designer</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            {/* Submit Button */}
            <Grid item xs={12}>
              <Button fullWidth type="submit" variant="contained" color="primary">
                Add Employer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EmployerForm;
