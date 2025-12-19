const eventService = require('./event.service');
const logger = require('../../utils/logger');

const createEvent = async (req, res) => {
    try {
        const event = await eventService.createEvent(req.body);
        logger.info(`Event created: ${event._id} type=${event.type} session=${event.session_id}`);
        res.status(201).json(event);
    } catch (error) {
        logger.error(`Error creating event: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

const getEventsBySession = async (req, res) => {
    try {
        const events = await eventService.getEventsBySession(req.params.sessionId);
        logger.info(`Fetched ${events.length} events for session ${req.params.sessionId}`);
        res.status(200).json(events);
    } catch (error) {
        logger.error(`Error fetching events for session ${req.params.sessionId}: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createEvent,
    getEventsBySession
};
