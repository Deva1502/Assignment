import { useState, useEffect } from 'react';
import api from '../api/axios';
import GameCard from '../components/GameCard';
import GameDetailsModal from '../components/GameDetailsModal';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const response = await api.get('/favorites');
            setFavorites(response.data);
        } catch (error) {
            console.error('Failed to fetch favorites', error);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (gameId) => {
        try {
            await api.delete(`/favorites/${gameId}`);
            fetchFavorites();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500 fill-current" />
                My Favorites
            </h1>

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : favorites.length === 0 ? (
                <div className="text-center py-12 text-gray-500 p-8 border border-dashed border-gray-700 rounded-xl">
                    You haven't added any favorites yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favorites.map((game) => (
                        <GameCard
                            key={game.id}
                            game={game}
                            refreshGames={fetchFavorites}
                            onClick={() => setSelectedGame(game)}
                        />
                    ))}
                </div>
            )}

            {selectedGame && (
                <GameDetailsModal
                    game={selectedGame}
                    onClose={() => setSelectedGame(null)}
                />
            )}
        </div>
    );
}
