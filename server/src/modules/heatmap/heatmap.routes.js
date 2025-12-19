const express = require('express');
const router = express.Router();
const heatmapController = require('./heatmap.controller');

router.get('/', heatmapController.getClickData);

module.exports = router;
