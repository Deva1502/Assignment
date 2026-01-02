const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
});

favoriteSchema.index({ user: 1, game: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
