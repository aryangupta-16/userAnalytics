const express = require('express');
const router = express.Router();
const eventController = require('./event.controller');

router.post('/', eventController.createEvent);
router.get('/session/:sessionId', eventController.getEventsBySession);

module.exports = router;
