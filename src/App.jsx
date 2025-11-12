import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";

/*
  App.jsx:
  - Defines all app routes
  - '/' shows Dashboard
  - '/category/:categoryName' shows CategoryPage
*/

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
    </Routes>
  );
};

export default App;
