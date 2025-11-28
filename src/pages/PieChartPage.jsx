import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import salesData from "../data/data.json";
import { Box, Typography, Tabs, Tab } from "@mui/material";

const categories = ["phone", "laptop", "tv", "book"];
const colors = { phone: "#4CAF50", laptop: "#2196F3", tv: "#FF9800", book: "#9C27B0" };

// Helper function to get last N days of data
const getLastNDaysData = (n) => {
  return categories.map((cat) => ({
    name: cat,
    y: salesData[cat].slice(0, n).reduce((sum, d) => sum + d.sales, 0),
    color: colors[cat],
  }));
};

const PieChartPage = () => {
  const [tab, setTab] = useState(0); // 0=weekly,1=monthly
  const tabMapping = { 0: 7, 1: 30 }; // 7 days = weekly, 30 days = monthly

  const options = {
    chart: { type: "pie" },
    title: {
      text: tab === 0 ? "Weekly Sales Distribution" : "Monthly Sales Distribution",
    },
    series: [{ name: "Sales", data: getLastNDaysData(tabMapping[tab]) }],
    tooltip: { pointFormat: "{series.name}: <b>{point.y}</b>" },
    credits: { enabled: false },
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Pie Chart Analysis
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} centered sx={{ mb: 3 }}>
        <Tab label="Weekly" />
        <Tab label="Monthly" />
      </Tabs>

      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
};

export default PieChartPage;
