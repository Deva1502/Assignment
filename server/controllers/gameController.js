const Game = require('../models/Game');
const Favorite = require('../models/Favorite');

exports.getGames = async (req, res) => {
    try {
        const { type, sport, provider, search } = req.query;
        let query = {};

        if (type) query.type = type.toUpperCase();
        if (sport) query.sport = sport;
        if (provider) query.provider = provider;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { teamA: { $regex: search, $options: 'i' } },
                { teamB: { $regex: search, $options: 'i' } }
            ];
        }

        const games = await Game.find(query);
        let userFavorites = [];

        if (req.user) {
            userFavorites = await Favorite.find({ user: req.user.userId }).distinct('game');
        }

        const favIds = userFavorites.map(id => id.toString());

        const gamesWithFav = games.map(game => ({
            ...game.toObject(),
            id: game._id,
            isFavorite: favIds.includes(game._id.toString())
        }));

        res.json(gamesWithFav);
    } catch (error) {
        console.error('GetGames Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
