import React from "react";
import { Box, Typography, Button, Grid, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme(); // access MUI theme palette

  // List of categories
  const categories = ["Phone", "Laptop", "Book", "TV"];

  return (
    <Box sx={{ width: "100vw", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f7f8f4a7",
          padding: 4,
        }}
      >
        {/* Title with theme color */}
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            color: theme.palette.primary.main, // uses theme primary color
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Select the Category
        </Typography>

        {/* Category Buttons */}
        <Grid container spacing={2} justifyContent="center">
          {categories.map((category) => (
            <Grid item key={category}>
              <Button
                variant="contained"
                color="primary" // uses theme primary color
                sx={{ minWidth: 150, padding: "12px 24px" }}
                onClick={() => navigate(`/category/${category.toLowerCase()}`)}
              >
                {category}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
