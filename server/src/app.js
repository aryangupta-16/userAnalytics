const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Logging Middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    next();
});

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
