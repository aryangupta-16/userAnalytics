const eventService = require('./event.service');

const createEvent = async (req, res) => {
    try {
        const event = await eventService.createEvent(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEventsBySession = async (req, res) => {
    try {
        const events = await eventService.getEventsBySession(req.params.sessionId);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createEvent,
    getEventsBySession
};
