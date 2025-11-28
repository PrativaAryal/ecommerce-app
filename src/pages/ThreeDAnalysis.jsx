import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Highcharts3D from "highcharts/highcharts-3d";
import salesData from "../data/data.json";
import { Box, Typography, Tabs, Tab } from "@mui/material";

const categories = ["phone", "laptop", "tv", "book"];
const colors = { phone: "#4CAF50", laptop: "#2196F3", tv: "#FF9800", book: "#9C27B0" };

const getLastNDays = (cat, days) => salesData[cat].slice(0, days).map(d => d.sales).reverse();
const getLastNDates = (days) => salesData[categories[0]].slice(0, days).map(d => d.date).reverse();

const ThreeDAnalysis = () => {
  const [tab, setTab] = useState(0); // 0: weekly, 1: monthly
  const days = tab === 0 ? 7 : 30;

  const series = categories.map(cat => ({
    name: cat,
    data: getLastNDays(cat, days),
    color: colors[cat],
  }));

  const options = {
    chart: {
      type: "column",
      options3d: {
        enabled: true,
        alpha: 20,
        beta: 20,
        depth: tab === 1 ? 90 : 45,       
        viewDistance: tab === 1 ? 38 : 22, 
      },
      height: tab === 1 ? 675 : 450,     
    },
    title: {
      text: `3D Sales Analysis (${tab === 0 ? "Weekly" : "Monthly"})`,
    },
    xAxis: {
      categories: getLastNDates(days),
      labels: { rotation: -45 },
      title: { text: "Date" },
    },
    yAxis: {
      title: { text: "Sales Units" },
      allowDecimals: false,
    },
    plotOptions: {
      column: {
        depth: tab === 1 ? 75 : 37,     
        groupZPadding: tab === 1 ? 23 : 11, 
        grouping: true,
      },
    },
    series,
    tooltip: {
      headerFormat: "<b>{point.key}</b><br>",
      pointFormat: "{series.name}: {point.y}",
    },
    credits: { enabled: false },
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        3D Sales Analysis
      </Typography>

      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        centered
        sx={{ mb: 3 }}
      >
        <Tab label="Weekly" />
        <Tab label="Monthly" />
      </Tabs>

      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
};

export default ThreeDAnalysis;
