const Event = require('../events/event.model');

const getSessions = async () => {
    return await Event.aggregate([
        {
            $group: {
                _id: '$session_id',
                eventCount: { $sum: 1 },
                startTime: { $min: '$timestamp' },
                endTime: { $max: '$timestamp' }
            }
        },
        { $sort: { startTime: -1 } }
    ]);
};

module.exports = {
    getSessions
};
