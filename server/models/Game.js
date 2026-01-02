const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    type: { type: String, enum: ['SPORTS', 'CASINO'], required: true },
    name: { type: String, required: true },
    provider: { type: String },
    sport: { type: String },
    category: { type: String },
    teamA: { type: String },
    teamB: { type: String },
    teamB: { type: String },
    startTime: { type: Date },
    image: { type: String },
});

module.exports = mongoose.model('Game', gameSchema);
