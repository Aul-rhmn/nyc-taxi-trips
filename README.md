# NYC Taxi Trip 

## Overview
This web application provides an interactive way to explore New York City's 2014 Yellow Taxi Trip Data. Users can visualize trip routes on a map, analyze fare amounts based on trip distance and time, and interact with insightful charts derived from data aggregation. The application also includes dynamic filtering options to refine trip exploration.

## Features
- **Map Visualization:** Displays trip routes from pickup to drop-off using Mapbox GL JS.
- **Fare Calculation:** Shows fare amounts based on trip time and distance.
- **Data Insights:** Provides interactive charts using Recharts to visualize aggregated data.
- **Filtering Options:** Allows users to filter trips by time, fare amount, trip distance, and payment type.
- **Efficient Data Handling:** Uses React Query for optimized data fetching and caching.

## Tech Stack
### Frontend
- **React.js & Next.js** – SPA with server-side rendering capabilities.
- **Mapbox GL JS** – For interactive map visualization.
- **Recharts** – To generate insightful data visualizations.
- **React Query** – Efficient data fetching and caching.
- **CSS & Tailwind CSS** – For a responsive and user-friendly design.

### Backend
- **Next.js API Routes** – For fetching and filtering taxi trip data.
- **Socrata API** – Utilized as a data source to handle large datasets efficiently.

### Optional Database
- **PostgreSQL & PostGIS** – Can be used for managing spatial queries efficiently.

## Installation
### Prerequisites
- Node.js v16+ installed
- Mapbox API key (if using Mapbox for maps)

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/Aul-rhmn/taxi-trip.git
   cd nyc-taxi-trips
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Future Enhancements
- Implement pagination or infinite scrolling for better dataset handling.
- Enhance caching strategies using React Query.
- Add more advanced filtering options and visualizations.
- Implement a full PostgreSQL + PostGIS backend for optimized spatial queries.

## License
This project is open-source and available under the MIT License.

