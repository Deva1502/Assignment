const express = require('express');
const gameController = require('../controllers/gameController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, gameController.getGames);

module.exports = router;
