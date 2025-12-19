const Event = require('../events/event.model');

const getClickData = async (url) => {
    return await Event.find({
        url: url,
        type: 'click'
    }, { x: 1, y: 1, _id: 0 });
};

module.exports = {
    getClickData
};
