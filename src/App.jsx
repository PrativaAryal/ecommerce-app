import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import CustomerFeedback from "./pages/CustomerFeedback";

/*
  App.jsx:
  - Dashboard: /
  - CategoryPage: /category/:categoryName
*/

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/feedback" element={<CustomerFeedback />} />

      <Route
        path="*"
        element={
          <div style={{ padding: 20 }}>
            <h2>404 - Page Not Found</h2>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
