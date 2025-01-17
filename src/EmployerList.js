import React, { useState, useEffect } from "react";
import { db } from "./firebase.js";
import {
  collection,
  query,
  onSnapshot,
  where,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
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
  const [editingEmployer, setEditingEmployer] = useState(null);

  useEffect(() => {
    let q = collection(db, "employers");

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

  const handleEdit = async (id) => {
    try {
      const employerDoc = await getDoc(doc(db, "employers", id));
      if (employerDoc.exists()) {
        setEditingEmployer({ id, ...employerDoc.data() });
      }
    } catch (error) {
      console.error("Error fetching employer:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployer({ ...editingEmployer, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      const employerRef = doc(db, "employers", editingEmployer.id);
      await updateDoc(employerRef, editingEmployer);
      console.log("Employer updated successfully!");
      setEditingEmployer(null);
    } catch (error) {
      console.error("Error updating employer:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Button
        className="custom-button"
        onClick={() => setEditingEmployer(null)}
        sx={{ mt: 2, mb: 2, display: "block", margin: "20px auto" }}
      >
        Back to Employer List
      </Button>

      {editingEmployer ? (
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
            Edit Employer
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={editingEmployer.name}
              onChange={handleFormChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Age"
              name="age"
              value={editingEmployer.age}
              onChange={handleFormChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="City"
              name="city"
              value={editingEmployer.city}
              onChange={handleFormChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={editingEmployer.address}
              onChange={handleFormChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={editingEmployer.department}
              onChange={handleFormChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={editingEmployer.email}
              onChange={handleFormChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={editingEmployer.phone}
              onChange={handleFormChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Joining Date"
              name="joiningDate"
              type="date"
              value={editingEmployer.joiningDate}
              onChange={handleFormChange}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Position"
              name="position"
              select
              value={editingEmployer.position}
              onChange={handleFormChange}
              sx={{ mb: 2 }}
            >
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Developer">Developer</MenuItem>
              <MenuItem value="Designer">Designer</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      ) : (
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
          {/* Filters */}
          <Box sx={{ marginBottom: 2 }}>
            <Grid container spacing={2}>
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
          {/* Employer List */}
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
                      Joining Date:{" "}
                      {new Date(employer.joiningDate).toLocaleDateString()}
                    </Typography>
                    <Typography>Position: {employer.position}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(employer.id)}
                    >
                      Edit
                    </Button>
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
      )}
    </Container>
  );
};

export default EmployerList;
