import { useState, useEffect } from 'react';
import { User, Mail, ShoppingCart, Package, Edit2, Save, X, HelpCircle, Calendar, DollarSign } from 'lucide-react';
import Navbar from '../components/Navbar';


const Profile = () => {
  const [user, setUser] = useState({ id: '12345', name: 'Alex Thompson', email: 'alex.thompson@email.com' });
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '' });
  const [orders, setOrders] = useState([
    { id: 'ORD-2024-001', items: [{ name: 'Wireless Headphones' }, { name: 'Phone Case' }], total: 129.99, date: '2024-10-15T10:30:00' },
    { id: 'ORD-2024-002', items: [{ name: 'Smart Watch' }], total: 299.99, date: '2024-10-10T14:20:00' }
  ]);
  const [cart, setCart] = useState([
    { name: 'USB-C Cable', price: 15.99 },
    { name: 'Screen Protector', price: 9.99 }
  ]);

  useEffect(() => {
    setUpdatedUser({ name: user.name, email: user.email });
  }, [user]);

  const handleEditToggle = () => {
    if (editing) {
      setUpdatedUser({ name: user.name, email: user.email });
    }
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(prev => ({ ...prev, ...updatedUser }));
    setEditing(false);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and view your activity</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Info Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-24"></div>
              <div className="relative px-6 pb-6">
                <div className="absolute -top-12 left-6">
                  <div className="bg-white rounded-full p-2 shadow-lg">
                    <div className="bg-gradient-to-br from-purple-400 to-blue-400 rounded-full w-20 h-20 flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-12 flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-500 text-sm">Member since 2024</p>
                  </div>
                  <button
                    onClick={editing ? handleSave : handleEditToggle}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
                      editing 
                        ? 'bg-green-500 hover:bg-green-600 text-white shadow-md' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {editing ? (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-50 rounded-lg p-2 mt-1">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                      {editing ? (
                        <input
                          type="text"
                          name="name"
                          value={updatedUser.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{user.name}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 rounded-lg p-2 mt-1">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                      {editing ? (
                        <input
                          type="email"
                          name="email"
                          value={updatedUser.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{user.email}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Orders */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 rounded-lg p-2">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
              </div>
              
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No orders yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order, idx) => (
                    <div key={idx} className="border-2 border-gray-100 rounded-xl p-4 hover:border-purple-200 transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-gray-900 text-lg">Order #{order.id}</p>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </div>
                        </div>
                        <div className="bg-green-50 px-3 py-1 rounded-full">
                          <p className="text-green-700 font-semibold flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, i) => (
                          <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Cart & Support */}
          <div className="space-y-6">
            {/* Cart */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 rounded-lg p-2">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
              </div>
              
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <span className="text-gray-800 font-medium">{item.name}</span>
                        <span className="text-purple-600 font-bold">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t-2 border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-700 font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-purple-600">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 shadow-md">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Support Card */}
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white transform transition-all hover:shadow-xl hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 rounded-lg p-2">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Need Help?</h2>
              </div>
              <p className="mb-6 text-white/90">Our customer support team is ready to assist you 24/7</p>
              <button className="w-full bg-white text-orange-500 font-bold py-3 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-md">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;