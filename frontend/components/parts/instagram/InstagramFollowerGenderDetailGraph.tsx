import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "13-17",
    male: 0,
    female: 0,
    undefined: 200
  },
  {
    name: "18-24",
    male: 2000,
    female: 3000,
    undefined: 200
  },
  {
    name: "25-34",
    male: 8000,
    female: 3000,
    undefined: 0
  },
  {
    name: "35-44",
    male: 1500,
    female: 0,
    undefined: 0
  },
  {
    name: "45-54",
    male: 1500,
    female: 0,
    undefined: 0
  },
  {
    name: "55-64",
    male: 0,
    female: 1000,
    undefined: 0
  },
  {
    name: "65+",
    male: 0,
    female: 0,
    undefined: 0
  }
];

export const InstagramFollowerGenderDetailGraph = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="male" stackId="1" fill="#8884d8" />
        <Bar dataKey="female" stackId="1" fill="#82ca9d" />
        <Bar dataKey="undefined" stackId="1" fill="#00ff7f" />
      </BarChart>
    </ResponsiveContainer>
  );
};
