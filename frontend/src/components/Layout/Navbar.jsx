import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-primary-600">
                            TaskFlow
                        </Link>
                    </div>

                    {isAuthenticated && (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700">
                                Welcome, <span className="font-semibold">{user?.name}</span>
                            </span>
                            <button
                                onClick={logout}
                                className="btn btn-secondary text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
