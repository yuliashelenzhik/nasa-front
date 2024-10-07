EarthTrackr

# Description

EarthTrackr is a full-stack application built with Express (TypeScript) on the backend and React (TypeScript) on the frontend. The app provides real-time data on global Earth events such as wildfires, volcanoes, severe storms, and other events (when available).

The data is filtered by event category and displayed across different tabs. Users can visualize monthly data for 2024 (the year most of NASA's API data is available) by event category, as well as see a chart that tracks the number of events in each category per continent.

To optimize performance, each API call caches data in local storage. When users revisit a tab or apply a filter within one hour of the previous request, the cached data is shown instantly. After one hour, the app will refresh the data with a new API call to ensure it’s up to date. This refresh interval can be adjusted in the code (frontend) to a longer period, such as 24 hours.

Also, users can search for a specific continent and filter event counts by the selected continent. Continent information is extracted from coordinates, and filter results are also stored in local storage to minimize redundant API calls when data is unlikely to have changed.

The app uses Recharts for data visualization.
Axios is used for API requests.
State management is handled primarily with Context API to avoid depending on too many external libraries.
Styling is implemented using SCSS.

It is deployed on Vercel.

## Clone the backend and frontend repositories:

Backend:

### `git clone https://github.com/yuliashelenzhik/nasa-app.git`

### `cd nasa-app`

Frontend:

### `git clone https://github.com/yuliashelenzhik/nasa-front.git`

### `cd nasa-front`

### Environment Variables

### Create a .env file in the root of your backend folder:

PORT=3000
API_KEY=your_nasa_api_key
EONET_API_URL=https://eonet.sci.gsfc.nasa.gov/api/v3

### Create a .env file in your frontend folder:

REACT_APP_API_URL=http://localhost:3000/api

### Backend setup

### `npm install`

### `npm run build`

For development:

### `npm run dev`

For production:

### `npm run start`

### Frontend Setup

### `npm install`

For development:

### `npm run start`

For production:

### `npm run build`

### Running the Application

Backend: Ensure that the backend server is running on http://localhost:3000.
Frontend: The React app will run on http://localhost:3001 (or another port if specified).

Once both are running, visit the frontend URL in the browser. The application should be fully functional, fetching data from NASA's API and displaying it on the frontend.
