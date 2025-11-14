import { useState, useEffect } from 'react';
import { Search, X, Calendar, MapPin, Clock, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({ address: '', date: '', time: '' });
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState([]); // cart state
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('https://service-booking-backend-3brg.onrender.com/services');
        setServices(response.data.services);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Fetch existing service requests for this user to pre-fill cart
  useEffect(() => {
    const fetchUserRequests = async () => {
      if (!token) return;
      try {
        const response = await axios.get('https://service-booking-backend-3brg.onrender.com/request/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // add requested services to cart
        setCart(response.data.requests || []);
      } catch (err) {
        console.error('Error fetching user requests:', err);
      }
    };
    fetchUserRequests();
  }, [token]);

  useEffect(() => {
    const path = window.location.pathname;
    const searchParam = path.split('/search/')[1];
    if (searchParam) setSearchQuery(decodeURIComponent(searchParam));
  }, []);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setFormData({ address: '', date: '', time: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://service-booking-backend-3brg.onrender.com/services/request/${selectedService._id}`,
        {
          address: formData.address,
          scheduledDate: formData.date,
          scheduledTime: formData.time
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // add newly requested service to cart
      setCart(prev => [...prev, response.data.request]);
      closeModal();
    } catch (err) {
      console.error('Error submitting request:', err);
      alert('Failed to submit request.');
    }
  };

  const goToPayment = () => {
    navigate('/payment', { state: { cart } }); // pass cart to payment page
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Services</h1>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for services..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                />
              </div>
            </div>

            {/* Cart Icon */}
            <div className="relative cursor-pointer" onClick={goToPayment}>
              <ShoppingCart className="w-8 h-8 text-gray-700 hover:text-blue-600 transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <p className="text-gray-600 text-center text-xl">Loading services...</p>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Found {filteredServices.length} services {searchQuery && `for "${searchQuery}"`}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map(service => (
                  <div key={service._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                        ⭐ {service.rating}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                      </div>
                      <button
                        onClick={() => openModal(service)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Request Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredServices.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-xl">No services found matching your search</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200">
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Service</h2>
              <p className="text-gray-600 mb-6">{selectedService?.name}</p>
              <div className="space-y-5">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" /> Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    placeholder="Enter your full address"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" /> Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" /> Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.address || !formData.date || !formData.time}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
