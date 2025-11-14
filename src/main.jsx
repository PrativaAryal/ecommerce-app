import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import "./index.css";

const Navbar = () => (
  <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
    <Toolbar sx={{ justifyContent: "center" }}>
      <Typography variant="h6">Ecommerce App</Typography>
    </Toolbar>
  </AppBar>
);

// Render app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
