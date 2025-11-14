import { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Reset attempted with:', { password, token });

    const payload = { password };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        payload
      );
      console.log("Password reset successfully:", response.data);
      alert("Password reset successfully! You can now log in.");
      navigate('/login');
    } catch (error) {
      console.error("Error resetting password:", error);
      if (error.response) {
        alert(error.response.data.message || "Something went wrong!");
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="images/loginBg1.webp"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center justify-center min-h-screen px-4 relative z-10">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <div className="text-center mb-8 text-2xl font-semibold text-Orange">
              Reset Password
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-Orange"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

               
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                  
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-Orange hover:bg-orange-700 text-white py-3 rounded font-semibold transition duration-200"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
