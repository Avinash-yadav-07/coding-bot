import React, { useState, useEffect } from "react";
import { db } from "./firebase.js";
import {
  collection,
  query,
  onSnapshot,
  where,
  doc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
  MenuItem,
} from "@mui/material";

const EmployerList = () => {
  const [employers, setEmployers] = useState([]);
  const [filters, setFilters] = useState({
    department: "",
    joiningDate: "",
    position: "",
  });

  useEffect(() => {
    let q = collection(db, "employers");

    // Apply filters dynamically
    if (filters.department) {
      q = query(q, where("department", "==", filters.department));
    }
    if (filters.joiningDate) {
      q = query(q, where("joiningDate", "==", filters.joiningDate));
    }
    if (filters.position) {
      q = query(q, where("position", "==", filters.position));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEmployers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [filters]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "employers", id));
      console.log("Employer deleted successfully!");
    } catch (error) {
      console.error("Error deleting employer:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          padding: 2,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Employer List
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Grid container spacing={2}>
            {/* Filter by Department */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Filter by Department"
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                placeholder="Enter department"
              />
            </Grid>
            {/* Filter by Joining Date */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Filter by Joining Date"
                name="joiningDate"
                type="date"
                value={filters.joiningDate}
                onChange={handleFilterChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            {/* Filter by Position */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Filter by Position"
                name="position"
                select
                value={filters.position}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All Positions</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Designer">Designer</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={2}>
          {employers.map((employer) => (
            <Grid item xs={12} sm={6} key={employer.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{employer.name}</Typography>
                  <Typography>Age: {employer.age}</Typography>
                  <Typography>City: {employer.city}</Typography>
                  <Typography>Address: {employer.address}</Typography>
                  <Typography>Department: {employer.department}</Typography>
                  <Typography>Email: {employer.email}</Typography>
                  <Typography>Phone: {employer.phone}</Typography>
                  <Typography>
                    Joining Date: {new Date(employer.joiningDate).toLocaleDateString()}
                  </Typography>
                  <Typography>Position: {employer.position}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(employer.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default EmployerList;
