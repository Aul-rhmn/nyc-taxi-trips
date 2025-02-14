import dynamic from "next/dynamic"
import FilterPanel from "@/components/FilterPanel"

const TaxiTripMap = dynamic(() => import("@/components/TaxiTripMap"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
})

const TripStats = dynamic(() => import("@/components/TripStats"), {
  ssr: false,
  loading: () => <p>Loading stats...</p>,
})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-12 lg:p-24">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">NYC Yellow Taxi Trip Explorer</h1>
      <div className="w-full flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
        <div className="w-full lg:w-1/3 order-2 lg:order-1">
          <FilterPanel />
          <TripStats />
        </div>
        <div className="w-full lg:w-2/3 order-1 lg:order-2">
          <TaxiTripMap />
        </div>
      </div>
    </main>
  )
}

