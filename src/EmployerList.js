import React, { useState, useEffect } from "react";
import { db } from "./firebase.js";
import { collection, query, onSnapshot, where, doc, deleteDoc } from "firebase/firestore";
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
} from "@mui/material";

const EmployerList = () => {
  const [employers, setEmployers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const q = filter
      ? query(collection(db, "employers"), where("department", "==", filter))
      : collection(db, "employers");

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEmployers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [filter]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "employers", id));
      console.log("Employer deleted successfully!");
    } catch (error) {
      console.error("Error deleting employer:", error);
    }
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
          <TextField
            fullWidth
            label="Filter by Department"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Enter department"
          />
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
