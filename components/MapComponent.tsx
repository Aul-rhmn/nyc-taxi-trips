"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface TripData {
  pickup_longitude: string
  pickup_latitude: string
  dropoff_longitude: string
  dropoff_latitude: string
  total_amount: string
}

interface MapComponentProps {
  tripData: TripData[] | undefined
}

export default function MapComponent({ tripData }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const center: L.LatLngExpression = [40.7128, -74.006]
  const zoom = 11

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    map.current = L.map(mapContainer.current).setView(center, zoom)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.current)

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!map.current || !tripData) return

    // Clear existing layers
    map.current.eachLayer((layer) => {
      if (layer instanceof L.Polyline) {
        map.current!.removeLayer(layer)
      }
    })

    tripData.forEach((trip) => {
      const pickup = [
        Number.parseFloat(trip.pickup_latitude),
        Number.parseFloat(trip.pickup_longitude),
      ] as L.LatLngExpression
      const dropoff = [
        Number.parseFloat(trip.dropoff_latitude),
        Number.parseFloat(trip.dropoff_longitude),
      ] as L.LatLngExpression

      L.polyline([pickup, dropoff], {
        color: getColorForFare(Number.parseFloat(trip.total_amount)),
        weight: 2,
        opacity: 0.6,
      }).addTo(map.current!)
    })
  }, [tripData])

  function getColorForFare(fare: number): string {
    if (fare <= 20) return "#2196f3"
    if (fare <= 40) return "#4caf50"
    if (fare <= 60) return "#ffc107"
    return "#f44336"
  }

  return <div ref={mapContainer} className="w-full h-full" />
}

