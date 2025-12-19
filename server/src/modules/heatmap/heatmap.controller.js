const heatmapService = require('./heatmap.service');

const getClickData = async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ message: 'URL query parameter is required' });
        }
        const clickData = await heatmapService.getClickData(url);
        res.status(200).json(clickData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getClickData
};
