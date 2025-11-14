import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!token);
    if (user && user.name) setUserName(user.name);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  // Generate avatar URL using initials if userName is available
  const avatarUrl = userName
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        userName
      )}&background=random&size=128`
    : '/images/default-avatar.png'; // fallback if you have a default image

  return (
    <nav className="bg-white px-4 py-4 flex items-center justify-between border-b relative">
      {/* Logo */}
      <div className="flex items-center">
        <img
          onClick={() => handleNavigation('/')}
          src="/images/logo1.jpg"
          alt="Logo"
          className="h-10 cursor-pointer rounded-md"
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <span
          onClick={() => handleNavigation('/services')}
          className="text-gray-700 hover:text-Orange cursor-pointer"
        >
          Services
        </span>

        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src={avatarUrl}
                alt="Avatar"
                className="h-8 w-8 rounded-full"
              />
              <span className="hidden md:inline text-gray-700">{userName}</span>
              <svg
                className="h-4 w-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg py-2 z-50">
                <span
                  onClick={() => handleNavigation('/profile')}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Profile
                </span>
                <span
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </span>
              </div>
            )}
          </div>
        ) : (
          <span
            onClick={() => handleNavigation('/login')}
            className="bg-orange-500 hover:bg-Orange text-white px-4 py-2 rounded-md w-full cursor-pointer"
          >
            Sign up / Log in
          </span>
        )}
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-700 focus:outline-none"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg z-50 transform origin-top transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
        }`}
      >
        <div className="flex flex-col py-2">
          <span
            onClick={() => handleNavigation('/services')}
            className="text-gray-700 hover:text-Orange cursor-pointer px-4 py-3 border-b"
          >
            Services
          </span>

          {isLoggedIn ? (
            <>
              <span
                onClick={() => handleNavigation('/profile')}
                className="text-gray-700 hover:text-Orange cursor-pointer px-4 py-3 border-b"
              >
                Profile
              </span>
              <span
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-full cursor-pointer"
              >
                Logout
              </span>
            </>
          ) : (
            <span
              onClick={() => handleNavigation('/login')}
              className="bg-orange-500 hover:bg-Orange text-white px-4 py-2 rounded-md w-full cursor-pointer"
            >
              Sign up / Log in
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
