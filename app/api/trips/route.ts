import { NextResponse } from "next/server"

const SOCRATA_API_BASE_URL = "https://data.cityofnewyork.us/resource/gkne-dk5s.json"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")
  const minFare = searchParams.get("minFare")
  const maxFare = searchParams.get("maxFare")
  const minDistance = searchParams.get("minDistance")
  const maxDistance = searchParams.get("maxDistance")

  let query = `${SOCRATA_API_BASE_URL}?$limit=1000`

  if (startDate) query += `&$where=pickup_datetime >= '${startDate}'`
  if (endDate) query += ` AND pickup_datetime <= '${endDate}'`
  if (minFare) query += ` AND total_amount >= ${minFare}`
  if (maxFare) query += ` AND total_amount <= ${maxFare}`
  if (minDistance) query += ` AND trip_distance >= ${minDistance}`
  if (maxDistance) query += ` AND trip_distance <= ${maxDistance}`

  try {
    const response = await fetch(query)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

