import { X, Calendar, Trophy, Users, MonitorPlay } from 'lucide-react';
import { useEffect } from 'react';

export default function GameDetailsModal({ game, onClose }) {
    if (!game) return null;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-card w-full max-w-2xl rounded-2xl overflow-hidden border border-gray-800 shadow-2xl animate-in zoom-in-95 duration-200 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative h-64 bg-slate-900">
                    {game.image ? (
                        <img
                            src={game.image}
                            alt={game.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                            <span className="text-6xl font-bold opacity-20 uppercase">{game.sport || game.provider}</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>

                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {game.type}
                            </span>
                            <span className="bg-slate-800/80 text-gray-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border border-gray-700">
                                {game.category || game.league || 'General'}
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-white shadow-sm leading-tight">{game.name}</h2>
                    </div>
                </div>

                <div className="p-8 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {game.type === 'SPORTS' ? (
                            <>
                                {game.startTime && (
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-gray-800">
                                        <div className="p-3 bg-blue-500/10 rounded-lg">
                                            <Calendar className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Match Date</h3>
                                            <p className="text-lg font-semibold text-white mt-1">
                                                {new Date(game.startTime).toLocaleString(undefined, {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {(game.teamA || game.teamB) && (
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-gray-800">
                                        <div className="p-3 bg-green-500/10 rounded-lg">
                                            <Users className="w-6 h-6 text-green-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Teams</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-lg font-semibold text-white">{game.teamA}</span>
                                                <span className="text-gray-500 font-bold">VS</span>
                                                <span className="text-lg font-semibold text-white">{game.teamB}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {game.sport && (
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-gray-800">
                                        <div className="p-3 bg-purple-500/10 rounded-lg">
                                            <Trophy className="w-6 h-6 text-purple-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Sport</h3>
                                            <p className="text-lg font-semibold text-white mt-1">{game.sport}</p>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {game.provider && (
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-gray-800">
                                        <div className="p-3 bg-orange-500/10 rounded-lg">
                                            <MonitorPlay className="w-6 h-6 text-orange-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Provider</h3>
                                            <p className="text-lg font-semibold text-white mt-1">{game.provider}</p>
                                        </div>
                                    </div>
                                )}

                                {game.category && (
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-gray-800">
                                        <div className="p-3 bg-pink-500/10 rounded-lg">
                                            <Trophy className="w-6 h-6 text-pink-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-400">Game Type</h3>
                                            <p className="text-lg font-semibold text-white mt-1">{game.category}</p>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
