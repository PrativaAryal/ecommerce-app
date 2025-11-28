import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import ChartsPage from "./pages/ChartsPage"; 
import ThreeDAnalysis from "./pages/ThreeDAnalysis";
import PieChartPage from "./pages/PieChartPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/charts" element={<ChartsPage />} />
      <Route path="/3d-analysis" element={<ThreeDAnalysis />} />
      <Route path="/pie-chart" element={<PieChartPage />} />
      
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
