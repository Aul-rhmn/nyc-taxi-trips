import { NextResponse } from "next/server"

const SOCRATA_API_BASE_URL = "https://data.cityofnewyork.us/resource/gkne-dk5s.json"
const SOCRATA_APP_TOKEN = process.env.SOCRATA_APP_TOKEN

export async function GET() {
  const query = `${SOCRATA_API_BASE_URL}?$select=date_trunc_ymd(pickup_datetime) as date, count(*) as trips, avg(total_amount) as avg_fare&$group=date&$order=date&$limit=7`

  const headers = new Headers({
    "X-App-Token": SOCRATA_APP_TOKEN || "",
  })

  try {
    const response = await fetch(query, { headers })
    const data = await response.json()

    const formattedData = data.map((item: any) => ({
      name: new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }),
      trips: Number.parseInt(item.trips),
      avgFare: Number.parseFloat(item.avg_fare).toFixed(2),
    }))

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error("Error fetching aggregated data:", error)
    return NextResponse.json({ error: "Failed to fetch aggregated data" }, { status: 500 })
  }
}

