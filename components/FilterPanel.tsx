"use client"

import { useState } from "react"
import { Input, Label } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useQueryClient } from "@tanstack/react-query"

export default function FilterPanel() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [minFare, setMinFare] = useState("")
  const [maxFare, setMaxFare] = useState("")
  const [minDistance, setMinDistance] = useState("")
  const [maxDistance, setMaxDistance] = useState("")

  const queryClient = useQueryClient()

  const handleApplyFilters = () => {
    const filters: Record<string, string> = {}
    if (startDate) filters.startDate = startDate
    if (endDate) filters.endDate = endDate
    if (minFare) filters.minFare = minFare
    if (maxFare) filters.maxFare = maxFare
    if (minDistance) filters.minDistance = minDistance
    if (maxDistance) filters.maxDistance = maxDistance

    queryClient.setQueryData(["tripDataFilters"], filters)
    queryClient.invalidateQueries({ queryKey: ["tripData"] })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="minFare">Min Fare ($)</Label>
          <Input type="number" id="minFare" value={minFare} onChange={(e) => setMinFare(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="maxFare">Max Fare ($)</Label>
          <Input type="number" id="maxFare" value={maxFare} onChange={(e) => setMaxFare(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="minDistance">Min Distance (miles)</Label>
          <Input type="number" id="minDistance" value={minDistance} onChange={(e) => setMinDistance(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="maxDistance">Max Distance (miles)</Label>
          <Input type="number" id="maxDistance" value={maxDistance} onChange={(e) => setMaxDistance(e.target.value)} />
        </div>
      </div>
      <Button onClick={handleApplyFilters} className="mt-4 w-full">
        Apply Filters
      </Button>
    </div>
  )
}

