const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, favoriteController.getFavorites);
router.post('/:gameId', authMiddleware, favoriteController.addFavorite);
router.delete('/:gameId', authMiddleware, favoriteController.removeFavorite);

module.exports = router;
