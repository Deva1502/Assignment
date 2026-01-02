import { useState, useEffect } from 'react';
import api from '../api/axios';
import GameCard from '../components/GameCard';
import GameDetailsModal from '../components/GameDetailsModal';
import { Search, Filter } from 'lucide-react';

export default function Dashboard() {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [loading, setLoading] = useState(true);

    const [type, setType] = useState('ALL');
    const [search, setSearch] = useState('');
    const [sportFilter, setSportFilter] = useState('');
    const [providerFilter, setProviderFilter] = useState('');

    const fetchGames = async () => {
        setLoading(true);
        try {
            const params = {};
            if (type !== 'ALL') params.type = type;
            if (search) params.search = search;
            if (sportFilter) params.sport = sportFilter;
            if (providerFilter) params.provider = providerFilter;

            const response = await api.get('/games', { params });
            setGames(response.data);
        } catch (error) {
            console.error('Failed to fetch games', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, [type, sportFilter, providerFilter]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchGames();
        }, 500);
        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <div className="space-y-6">

            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 rounded-xl border border-gray-800">

                <div className="flex bg-slate-900 rounded-lg p-1">
                    {['ALL', 'SPORTS', 'CASINO'].map((t) => (
                        <button
                            key={t}
                            onClick={() => { setType(t); setSportFilter(''); setProviderFilter(''); }}
                            className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${type === t ? 'bg-primary text-white shadow' : 'text-gray-400 hover:text-white'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search games..."
                        className="w-full bg-slate-900 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    {type !== 'CASINO' && (
                        <select
                            className="bg-slate-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:ring-1 focus:ring-primary outline-none"
                            value={sportFilter}
                            onChange={(e) => setSportFilter(e.target.value)}
                        >
                            <option value="">All Sports</option>
                            <option value="Cricket">Cricket</option>
                            <option value="Football">Football</option>
                            <option value="Tennis">Tennis</option>
                        </select>
                    )}
                    {type !== 'SPORTS' && (
                        <select
                            className="bg-slate-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 focus:ring-1 focus:ring-primary outline-none"
                            value={providerFilter}
                            onChange={(e) => setProviderFilter(e.target.value)}
                        >
                            <option value="">All Providers</option>
                            <option value="Evolution">Evolution</option>
                            <option value="Pragmatic Play">Pragmatic Play</option>
                            <option value="NetEnt">NetEnt</option>
                        </select>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading games...</div>
            ) : games.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No games found.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {games.map(game => (
                        <GameCard
                            key={game.id}
                            game={game}
                            refreshGames={fetchGames}
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
