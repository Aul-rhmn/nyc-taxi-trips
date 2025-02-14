"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

interface ChartComponentProps {
  data: any[]
}

export default function ChartComponent({ data }: ChartComponentProps) {
  return (
    <BarChart
      width={300}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="trips" fill="#8884d8" />
      <Bar yAxisId="right" dataKey="avgFare" fill="#82ca9d" />
    </BarChart>
  )
}

