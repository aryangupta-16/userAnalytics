const sessionService = require('./session.service');
const logger = require('../../utils/logger');

const getSessions = async (req, res) => {
    try {
        const sessions = await sessionService.getSessions();
        logger.info(`Fetched ${sessions.length} sessions`);
        res.status(200).json(sessions);
    } catch (error) {
        logger.error(`Error fetching sessions: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSessions
};
