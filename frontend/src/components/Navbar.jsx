import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Home, PlusCircle, Trophy, LogOut } from 'lucide-react';
import { logout } from '../reduxStore/slices/AuthSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
              <Home size={24} />
              <span>FlatmateHub</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/new-complaint" className="flex items-center space-x-1 hover:text-indigo-200">
                <PlusCircle size={20} />
                <span>New Complaint</span>
              </Link>
              <Link to="/leaderboard" className="flex items-center space-x-1 hover:text-indigo-200">
                <Trophy size={20} />
                <span>Leaderboard</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="opacity-75">Karma Points:</span>
              <span className="ml-1 font-bold">{user?.karmaPoints || 0}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-indigo-700"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar 