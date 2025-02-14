"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import dynamic from "next/dynamic"

const ChartComponent = dynamic(() => import("./ChartComponent"), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
})

async function fetchAggregatedData(filters: Record<string, string>) {
  const baseUrl = "https://data.cityofnewyork.us/resource/gkne-dk5s.json"
  let query = `${baseUrl}?$select=date_trunc_ymd(pickup_datetime) as date, count(*) as trips, avg(total_amount) as avg_fare&$group=date&$order=date&$limit=7`

  if (filters.startDate) query += `&$where=pickup_datetime >= '${filters.startDate}'`
  if (filters.endDate) query += ` AND pickup_datetime <= '${filters.endDate}'`
  if (filters.minFare) query += ` AND total_amount >= ${filters.minFare}`
  if (filters.maxFare) query += ` AND total_amount <= ${filters.maxFare}`
  if (filters.minDistance) query += ` AND trip_distance >= ${filters.minDistance}`
  if (filters.maxDistance) query += ` AND trip_distance <= ${filters.maxDistance}`

  const response = await fetch(query)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const data = await response.json()
  return data.map((item: any) => ({
    name: new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }),
    trips: Number.parseInt(item.trips),
    avgFare: Number.parseFloat(item.avg_fare).toFixed(2),
  }))
}

export default function TripStats() {
  const queryClient = useQueryClient()
  const filters = (queryClient.getQueryData(["tripDataFilters"]) as Record<string, string>) || {}

  const { data, isLoading, error } = useQuery({
    queryKey: ["aggregatedData", filters],
    queryFn: () => fetchAggregatedData(filters),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {(error as Error).message}</div>

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Trip Statistics</h2>
      <div className="overflow-x-auto">
        <ChartComponent data={data} />
      </div>
    </div>
  )
}

