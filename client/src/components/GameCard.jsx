import { Heart } from 'lucide-react';
import api from '../api/axios';
import { useState } from 'react';

export default function GameCard({ game, refreshGames, onClick }) {
    const [loading, setLoading] = useState(false);
    const [imgError, setImgError] = useState(false);

    const toggleFavorite = async () => {
        setLoading(true);
        try {
            if (game.isFavorite) {
                await api.delete(`/favorites/${game.id}`);
            } else {
                await api.post(`/favorites/${game.id}`);
            }
            refreshGames();
        } catch (error) {
            console.error('Error toggling favorite', error);
            alert('Error updating favorite');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            onClick={onClick}
            className="bg-card text-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-800 hover:border-gray-600 relative group cursor-pointer hover:scale-[1.02]"
        >
            <div className="h-40 bg-slate-900 relative">
                {game.image && !imgError ? (
                    <img
                        src={game.image}
                        alt={game.name}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                        <span className="text-4xl font-bold opacity-20 uppercase">{game.sport || game.provider}</span>
                    </div>
                )}

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}
                        disabled={loading}
                        className={`p-2 rounded-full shadow-lg ${game.isFavorite ? 'bg-red-500 text-white' : 'bg-slate-900/80 text-gray-400 hover:text-white backdrop-blur-sm'}`}
                    >
                        <Heart className={`w-5 h-5 ${game.isFavorite ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {game.type}
                    </span>
                    {game.isFavorite && <Heart className="w-4 h-4 text-red-500 fill-current" />}
                </div>
                <h3 className="text-lg font-bold truncate" title={game.name}>{game.name}</h3>
                {game.type === 'SPORTS' ? (
                    <div className="text-sm text-gray-400 mt-1">
                        <p>{game.category || game.league}</p>
                        <p className="text-xs mt-2">{new Date(game.startTime).toLocaleString()}</p>
                    </div>
                ) : (
                    <div className="text-sm text-gray-400 mt-1">
                        <p>{game.provider}</p>
                        <p>{game.category}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
