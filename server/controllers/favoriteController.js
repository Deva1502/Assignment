const Favorite = require('../models/Favorite');

exports.getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user.userId }).populate('game');
        const data = favorites.map(fav => {
            if (!fav.game) return null;
            return {
                ...fav.game.toObject(),
                id: fav.game._id,
                isFavorite: true
            };
        }).filter(item => item !== null);
        res.json(data);
    } catch (error) {
        console.error('GetFavorites Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.addFavorite = async (req, res) => {
    try {
        const { gameId } = req.params;
        const exists = await Favorite.findOne({ user: req.user.userId, game: gameId });
        if (exists) return res.status(400).json({ message: 'Already favorite' });

        const favorite = new Favorite({ user: req.user.userId, game: gameId });
        await favorite.save();
        res.status(201).json({ message: 'Added to favorites' });
    } catch (error) {
        console.error('AddFavorite Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const { gameId } = req.params;
        await Favorite.findOneAndDelete({ user: req.user.userId, game: gameId });
        res.json({ message: 'Removed from favorites' });
    } catch (error) {
        console.error('RemoveFavorite Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
