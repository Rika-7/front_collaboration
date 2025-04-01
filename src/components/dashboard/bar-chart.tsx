"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "1月", total: 100 },
  { name: "2月", total: 90 },
  { name: "3月", total: 150 },
  { name: "4月", total: 60 },
  { name: "5月", total: 70 },
  { name: "6月", total: 80 },
  { name: "7月", total: 120 },
  { name: "8月", total: 90 },
  { name: "9月", total: 130 },
  { name: "10月", total: 120 },
  { name: "11月", total: 130 },
  { name: "12月", total: 100 },
];

export function BarChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsBarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}万円`}
        />
        <Tooltip
          formatter={(value) => [`${value}万円`, "収益"]}
          labelFormatter={(label) => `月: ${label}`}
        />
        <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
