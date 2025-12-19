const sessionService = require('./session.service');

const getSessions = async (req, res) => {
    try {
        const sessions = await sessionService.getSessions();
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSessions
};
