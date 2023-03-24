import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const MyChart = ({ chartData }) => {
  console.log(chartData);
  // const [chartData, setChartData] = useState([]);

  // useEffect(() => {
  //   // format the input data into the correct format for the Recharts library
  //   const formattedData = data.map(({ year, equity }) => ({
  //     year: String(year),
  //     equity,
  //   }));
  //   setChartData(formattedData);
  // }, [data]);

  // const chartData = [
  //   {date: "2023-03-01", bond1return: 0, bond2return: 0, bond3return: 0},
  //   {date: "2023-03-02", bond2return: 2},
  //   {date: "2023-03-03", bond3return: 3},
  //   {date: "2023-03-04", bond1return: 4},
  //   {date: "2023-03-05", bond2return: 5},
  //   {date: "2023-03-06", bond3return: 6, bond1return: 7}
  // ]

  return (
    <LineChart width={600} height={200} data={chartData}>
      <XAxis dataKey="date" />
      <YAxis title="profit"/>
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <Tooltip />
      <Legend layout="vertical" align="left" verticalAlign="middle"/>
      <Line type="monotone" name="bond 1" connectNulls={true} dataKey="bond1return" stroke="#4287f5" activeDot={{ r: 8 }} />
      <Line type="monotone" name="bond 2" connectNulls={true} dataKey="bond2return" stroke="#f54278" activeDot={{ r: 8 }} />
      <Line type="monotone" name="bond 3" connectNulls={true} dataKey="bond3return" stroke="#e0f542" activeDot={{ r: 8 }} />
    </LineChart>
  );
};

export default MyChart;