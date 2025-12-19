const express = require('express');
const router = express.Router();
const sessionController = require('./session.controller');

router.get('/', sessionController.getSessions);

module.exports = router;
