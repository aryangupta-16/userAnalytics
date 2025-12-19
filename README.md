# User Analytics Application

A full-stack user analytics application that tracks user interactions (page views, clicks) on a webpage, stores them in MongoDB, and displays them in a dashboard.

## Tech Stack

- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Frontend**: Next.js, React, Tailwind CSS
- **Tracker**: Vanilla JavaScript

## Project Structure

```
.
├── client/             # Client-side tracker and demo page
│   ├── tracker/        # Tracker script source
│   └── public/         # Demo HTML page
├── server/             # Node.js/Express Backend
│   └── src/
│       ├── modules/    # Feature modules (events, sessions, heatmap)
│       └── ...
├── dashboard/          # Next.js Frontend Dashboard
│   └── app/            # App router pages and components
└── docker-compose.yml  # Docker composition for MongoDB
```

## Setup and Running

### Prerequisites
- Node.js (v18+)
- Docker (for MongoDB)

### 1. Start Database
Start the MongoDB instance using Docker:
```bash
docker-compose up -d mongodb
```

### 2. Start Backend Server
Navigate to the server directory and start the application:
```bash
cd server
npm install
npm start
```
The server will run on `http://localhost:3001`.

### 3. Start Dashboard
Navigate to the dashboard directory and start the Next.js app:
```bash
cd dashboard
npm install
npm run dev
```
The dashboard will be available at `http://localhost:3000`.

### 4. Test Tracking
Open the demo page in your browser:
`client/public/demo.html`

(Note: You may need to serve this file via a local server if you encounter CORS issues with `file://` protocol, although the server is configured to accept CORS. A simple way is `npx serve client/public` or `python3 -m http.server` inside `client/public`.)

## API Documentation

### 1. Create Event
Records a user interaction (page view or click).

- **Endpoint**: `POST /api/events`
- **Request Body**:
```json
{
  "session_id": "session_12345",
  "type": "page_view", // or "click"
  "url": "http://localhost:3000/",
  "timestamp": "2023-10-27T10:00:00Z",
  "x": 0, // Optional, for clicks
  "y": 0  // Optional, for clicks
}
```
- **Response**:
```json
{
  "_id": "653b8...",
  "session_id": "session_12345",
  "type": "page_view",
  "url": "http://localhost:3000/",
  "timestamp": "2023-10-27T10:00:00Z",
  "__v": 0
}
```

### 2. Get All Sessions
Retrieves a list of user sessions with aggregated event counts.

- **Endpoint**: `GET /api/sessions`
- **Response**:
```json
[
  {
    "_id": "session_12345",
    "eventCount": 15,
    "startTime": "2023-10-27T10:00:00Z",
    "endTime": "2023-10-27T10:05:00Z"
  },
  {
    "_id": "session_67890",
    "eventCount": 3,
    "startTime": "2023-10-27T11:00:00Z",
    "endTime": "2023-10-27T11:01:00Z"
  }
]
```

### 3. Get Session Events
Retrieves the full event history for a specific session.

- **Endpoint**: `GET /api/events/session/:sessionId`
- **Example**: `GET /api/events/session/session_12345`
- **Response**:
```json
[
  {
    "_id": "653b8...",
    "session_id": "session_12345",
    "type": "page_view",
    "url": "http://localhost:3000/",
    "timestamp": "2023-10-27T10:00:00Z"
  },
  {
    "_id": "653b9...",
    "session_id": "session_12345",
    "type": "click",
    "url": "http://localhost:3000/",
    "x": 150,
    "y": 300,
    "timestamp": "2023-10-27T10:00:05Z"
  }
]
```

### 4. Get Heatmap Data
Retrieves click coordinates for a specific page URL.

- **Endpoint**: `GET /api/heatmap`
- **Query Params**: `url` (encoded URL string)
- **Example**: `GET /api/heatmap?url=http%3A%2F%2Flocalhost%3A3000%2F`
- **Response**:
```json
[
  { "x": 100, "y": 200 },
  { "x": 150, "y": 300 },
  { "x": 120, "y": 250 }
]
```

## Assumptions and Trade-offs

### Assumptions
1.  **Session Management**: The tracker generates a simple random session ID and stores it in `localStorage`. In a production app, this might be handled via server-side cookies or more robust fingerprinting.
2.  **Security**: The API currently allows CORS from any origin (`*`) for demonstration purposes. In production, this should be restricted to specific domains.
3.  **Data Volume**: The current MongoDB schema is simple. For high-scale analytics, we would likely need time-series collections, sharding, or a dedicated OLAP database (e.g., ClickHouse).
4.  **Visualizations**: The heatmap is a simple scatter plot of dots. A real heatmap would use density clustering or a canvas-based gradient overlay.

### Trade-offs
1.  **Monolithic Backend**: I chose a modular monolithic structure for the Node.js server. While microservices are popular, a modular monolith is easier to develop, test, and deploy for this scope.
2.  **Polling vs. WebSockets**: The dashboard fetches data on load. Real-time updates via WebSockets (Socket.io) were omitted to keep complexity low, but would be a great addition for a "Live View".
3.  **Client-side Tracking**: The tracker uses `fetch` or `navigator.sendBeacon`. `sendBeacon` is preferred for reliability on page unload, but we fallback to `fetch` if needed.
4.  **No Authentication**: The dashboard is public. In a real scenario, we would implement auth (e.g., NextAuth.js) to protect the analytics data.
