import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Registration attempted with:', {name, email, password });

    const payload = {
      name,email,password
    }

    try {

    const response = await axios.post(
      "https://service-booking-backend-3brg.onrender.com/api/auth/register",
      payload
    );

    console.log("Registration successful:", response.data);
    alert("Account created successfully!");
    navigate("/login");

  } catch (error) {
    console.error("Error registering:", error);

    if (error.response) {
      alert(error.response.data.message || "Something went wrong!");
    } else {
      alert("Network error. Please try again.");
    }
  }

  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleNavigation = (path)=>{
    navigate(path);
  }

 
  return (
    <>
    <Navbar/>
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="images/loginBg1.webp" 
          alt="Person assembling furniture" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8 font-semibold text-2xl text-Orange">
           Create an Account
          </div>

          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              {/* <label htmlFor='name' className='block text-gray-700 mb-2'>Name</label> */}
              <input 
                type='name'
                id='name'
                className='w-full px-4 py-2 border-gray-300 border rounded focus:outline-none focus:ring-2 focus:ring-Orange'
                placeholder="Full Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              {/* <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label> */}
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-Orange"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-2">
              {/* <label htmlFor="password" className="block text-gray-700 mb-2">Password</label> */}
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password" 
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-Orange"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
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
            </div>

            <div className="mb-2">
              {/* <label htmlFor="password" className="block text-gray-700 mb-2">Confirm Password</label> */}
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password" 
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-Orange"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
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
            </div>

            <div className="mb-6">
              {/* <a href="/forgot-password" className="text-Orange hover:text-orange-700 text-sm">Forgot password?</a> */}
            </div>

            <button
              type="submit" 
              className="w-full bg-Orange hover:bg-orange-700 font-semibold text-white py-3 rounded transition duration-200"
            >
              Sign Up
            </button>
          </form>

      
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
            already have an account?
              <a href="" onClick={()=>handleNavigation('/login')} className="text-orange-500 text-md font-semibold  hover:text-Orange ">Login here</a>
            </p>
          </div>
        </div>
      </div>

      
      {/* <div className="absolute bottom-4 left-4 z-20">
        <button className="bg-green-600 text-white rounded-full px-4 py-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          Help
        </button>
      </div> */}


    </div>
    {/* <Footer /> */}
    </>
  );
};

export default SignUp;