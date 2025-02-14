"use client"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import dynamic from "next/dynamic"

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
})

interface TripData {
  pickup_longitude: string
  pickup_latitude: string
  dropoff_longitude: string
  dropoff_latitude: string
  total_amount: string
}

async function fetchTripData(filters: Record<string, string>) {
  const params = new URLSearchParams(filters)
  const response = await fetch(`/api/trips?${params}`)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export default function TaxiTripMap() {
  const queryClient = useQueryClient()
  const filters = (queryClient.getQueryData(["tripDataFilters"]) as Record<string, string>) || {}

  const {
    data: tripData,
    isLoading,
    error,
  } = useQuery<TripData[]>({
    queryKey: ["tripData", filters],
    queryFn: () => fetchTripData(filters),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {(error as Error).message}</div>

  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
      <MapComponent tripData={tripData} />
    </div>
  )
}

