const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('User Analytics API is running');
});

// Import routes
const eventRoutes = require('./modules/events/event.routes');
const sessionRoutes = require('./modules/sessions/session.routes');
const heatmapRoutes = require('./modules/heatmap/heatmap.routes');

app.use('/api/events', eventRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/heatmap', heatmapRoutes);

module.exports = app;
