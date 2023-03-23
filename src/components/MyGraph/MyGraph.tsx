import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const MyGraph = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // format the input data into the correct format for the Recharts library
    const formattedData = data.map(({ year, equity }) => ({
      year: String(year),
      equity,
    }));
    setChartData(formattedData);
  }, [data]);

  return (
    <LineChart width={800} height={400} data={chartData}>
      <XAxis dataKey="year" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="equity" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
};

export default MyGraph;
