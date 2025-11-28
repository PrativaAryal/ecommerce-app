import React from "react";
import { Box, Typography, Button, Grid, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const categories = ["Phone", "Laptop", "Book", "TV"];

  // Unified button style
  const buttonStyle = {
    mt: 2,
    padding: "12px 32px",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "10px",
    minWidth: 200,
    textTransform: "none",
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f4f6fb",
      }}
    >
      {/* Logo + Title */}
      <Box
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          borderBottom: "2px solid #e0e0e0",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
          alt="logo"
          width={45}
        />
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: theme.palette.primary.main }}
        >
          E-Commerce Dashboard
        </Typography>
      </Box>

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Select the Category
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {categories.map((category) => (
            <Grid item key={category}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  minWidth: 150,
                  padding: "14px 28px",
                  fontSize: "1rem",
                  borderRadius: "10px",
                  textTransform: "capitalize",
                }}
                onClick={() =>
                  navigate(`/category/${category.toLowerCase()}`)
                }
              >
                {category}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          sx={buttonStyle}
          onClick={() => navigate("/charts")}
        >
          View Charts
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={buttonStyle}
          onClick={() => navigate("/3d-analysis")}
        >
          View 3D Analysis
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={buttonStyle}
          onClick={() => navigate("/pie-chart")}
        >
          View Pie Chart
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
