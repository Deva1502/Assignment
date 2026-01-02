import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Heart, Gamepad2 } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-card border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
                        <Gamepad2 className="w-8 h-8" />
                        <span>BetMaster Mini</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-300 text-sm hidden sm:block">Welcome, {user?.name}</span>

                        <Link to="/favorites" className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Favorites">
                            <Heart className="w-6 h-6" />
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
