import { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { email });
    const payload = {email}
    try{
      const resposne = await axios.post("http://localhost:5000/api/auth/forgot-password",payload)
      console.log("Email is sent Successfully",resposne.data)
      alert("Reset link is send to your Mail")
    }catch(error){
      console.error("Error registering:", error);
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
          alt="Person assembling furniture" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8 text-2xl font-semibold text-Orange">
           Forgot Password
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
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

            

            <button 
              type="submit" 
              className="w-full bg-Orange hover:bg-orange-700 text-white py-3 rounded font-semibold transition duration-200"
            >
              Send Reset Link
            </button>
          </form>

      
          
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
    </>
  );
};

export default ForgotPassword;