const heatmapService = require('./heatmap.service');
const logger = require('../../utils/logger');

const getClickData = async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) {
            logger.warn('Heatmap request missing URL parameter');
            return res.status(400).json({ message: 'URL query parameter is required' });
        }
        const clickData = await heatmapService.getClickData(url);
        logger.info(`Fetched ${clickData.length} click points for URL: ${url}`);
        res.status(200).json(clickData);
    } catch (error) {
        logger.error(`Error fetching heatmap data: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getClickData
};
