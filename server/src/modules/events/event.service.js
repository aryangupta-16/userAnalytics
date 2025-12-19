const Event = require('./event.model');

const createEvent = async (eventData) => {
    const event = new Event(eventData);
    return await event.save();
};

const getEventsBySession = async (sessionId) => {
    return await Event.find({ session_id: sessionId }).sort({ timestamp: 1 });
};

module.exports = {
    createEvent,
    getEventsBySession
};
