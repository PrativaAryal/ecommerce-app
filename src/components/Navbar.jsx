import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

/*
  Navbar Component
  - Uses MUI AppBar for consistent styling  
*/

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#f8f4f757", 
        width: "100%", // full width of screen
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        {/* Typography: used for styled text */}
        <Typography variant="h6" component="div">
          Ecommerce App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
