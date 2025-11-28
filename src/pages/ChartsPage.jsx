import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import salesData from "../data/data.json";
import { Box, Typography, Tabs, Tab, Divider } from "@mui/material";

const categories = ["phone", "laptop", "tv", "book"];
const colors = { phone: "#4CAF50", laptop: "#2196F3", tv: "#FF9800", book: "#9C27B0" };

// Build series data from JSON
const buildSeries = (data, cats) =>
  cats.map((cat) => ({
    name: cat,
    data: data[cat].map((d) => d.sales),
    color: colors[cat],
  }));

// Get last N days of data
const getLastNDays = (data, n) => {
  const result = {};
  categories.forEach((cat) => {
    result[cat] = data[cat].slice(0, n);
  });
  return result;
};

const ChartsPage = () => {
  const [tab, setTab] = useState(0); // 0=weekly,1=monthly
  const tabs = ["Weekly", "Monthly"];

  const filteredData = tab === 0 ? getLastNDays(salesData, 7) : getLastNDays(salesData, 30);

  const options = (title, type) => ({
    chart: { type },
    title: { text: title },
    xAxis: { categories: filteredData[categories[0]].map((d) => d.date) },
    yAxis: { title: { text: "Units Sold" } },
    series: buildSeries(filteredData, categories),
    tooltip: { shared: true },
    credits: { enabled: false },
  });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Sales Analytics
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} centered sx={{ mb: 4 }}>
        {tabs.map((t) => (
          <Tab key={t} label={t} />
        ))}
      </Tabs>

      <Typography variant="h6" sx={{ mb: 2 }}>
        {tabs[tab]} Line Chart
      </Typography>
      <HighchartsReact highcharts={Highcharts} options={options(`${tabs[tab]} Line Chart`, "line")} />

      <Divider sx={{ my: 5 }} />

      <Typography variant="h6" sx={{ mb: 2 }}>
        {tabs[tab]} Column Chart
      </Typography>
      <HighchartsReact highcharts={Highcharts} options={options(`${tabs[tab]} Column Chart`, "column")} />
    </Box>
  );
};

export default ChartsPage;
