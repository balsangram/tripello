import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users, Search, Star, Shield, Award, Globe, User, UserPlus, X } from "lucide-react";

function Hero() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: "Bangalore, Karnataka",
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 1,
    rooms: 1,
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  const heroImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ];

  useEffect(() => {
    setIsVisible(true);

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, []);

  const updateGuests = () => {
    setShowGuestModal(false);
  };

  const updateDates = () => {
    setShowDateModal(false);
  };

  const handleLocationChange = (e) => {
    setSearchData({ ...searchData, location: e.target.value });
  };

  const handleDateChange = (type, date) => {
    setSearchData({ ...searchData, [type]: date });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Ensure required fields have values; set defaults if empty
    const finalData = {
      ...searchData,
      checkIn: searchData.checkIn || new Date().toISOString().split('T')[0], // Default to today if empty
      checkOut: searchData.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0], // Default to tomorrow
    };
    navigate(`/search?location=${encodeURIComponent(finalData.location)}&checkin=${finalData.checkIn}&checkout=${finalData.checkOut}&adults=${finalData.adults}&children=${finalData.children}&rooms=${finalData.rooms}`);
  };

  const popularDestinations = [
    "Goa", "Manali", "Kerala", "Rajasthan", "Himachal"
  ];

  const guestsText = `${searchData.adults} Adults, ${searchData.children} Children`;
  const datesText = searchData.checkIn && searchData.checkOut ? `${searchData.checkIn} - ${searchData.checkOut}` : "Add dates";

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Animated Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          style={{ backgroundImage: `url('${image}')` }}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/50 to-indigo-900/70"></div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl"></div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/30 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-2/3 w-3 h-3 bg-white/25 rounded-full animate-float-slow"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full px-6 lg:px-12 py-20">
        {/* Left Content */}
        <div className={`flex-1 lg:w-1/2 space-y-8 mb-12 lg:mb-0 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-2xl border border-white/30">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Award Winning</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-2xl border border-white/30">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Secure Booking</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-2xl border border-white/30">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">Worldwide</span>
            </div>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
            Start Your Journey with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 animate-gradient">
              Tripeloo
            </span>
          </h1>

          <p className="text-xl text-white/90 leading-relaxed max-w-lg backdrop-blur-sm bg-white/10 rounded-2xl p-4 border border-white/20">
            Accompanying us, you have a trip full of experiences. With Tripeloo, booking accommodation, resort villas, hotels has never been easier.
          </p>

          {/* Popular Destinations */}
          <div className="flex flex-wrap gap-3">
            <span className="text-white/80 font-medium">Popular:</span>
            {popularDestinations.map((destination, index) => (
              <button
                key={destination}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/30 text-sm font-medium"
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => setSearchData({ ...searchData, location: destination })}
              >
                {destination}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 pt-4">
            <div className="text-white">
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-white/70 text-sm">Happy Travelers</div>
            </div>
            <div className="text-white">
              <div className="text-2xl font-bold">150+</div>
              <div className="text-white/70 text-sm">Destinations</div>
            </div>
            <div className="text-white">
              <div className="text-2xl font-bold">4.8</div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white/70 ml-1">Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Search Section */}
        <div className={`flex-1 lg:w-1/2 max-w-md transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 lg:p-8 border border-white/50 hover:shadow-3xl transition-all duration-500">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Stay</h3>
              <p className="text-gray-600">Discover amazing places around the world</p>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              {/* Location Input */}
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={searchData.location}
                  onChange={handleLocationChange}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-300 group-hover:border-blue-300"
                />
              </div>

              {/* Dates Input - Single Field */}
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Add dates"
                  value={datesText}
                  onClick={() => setShowDateModal(true)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg cursor-pointer transition-all duration-300 group-hover:border-blue-300"
                  readOnly
                />
              </div>

              {/* Guests Input */}
              <div className="relative group">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Guests"
                  value={guestsText}
                  onClick={() => setShowGuestModal(true)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg cursor-pointer transition-all duration-300 group-hover:border-blue-300"
                  readOnly
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Search Stays
                <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity delay-200"></div>
              </button>
            </form>

            {/* Quick Links */}
            <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
              <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
                🏠 Vacation Rentals
              </button>
              <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
                🏨 Hotels
              </button>
              <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
                🌴 Resorts
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Date Selection Modal */}
      {showDateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Select Dates</h3>
                <button
                  onClick={() => setShowDateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Check-in */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Check-in Date</label>
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => handleDateChange('checkIn', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Check-out */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Check-out Date</label>
                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) => handleDateChange('checkOut', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={searchData.checkIn || new Date().toISOString().split('T')[0]}
                />
              </div>

              <button
                onClick={updateDates}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guest Selection Modal */}
      {showGuestModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Select Guests</h3>
                <button
                  onClick={() => setShowGuestModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Adults</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSearchData({ ...searchData, adults: Math.max(1, searchData.adults - 1) })}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{searchData.adults}</span>
                  <button
                    type="button"
                    onClick={() => setSearchData({ ...searchData, adults: searchData.adults + 1 })}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserPlus className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Children</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSearchData({ ...searchData, children: Math.max(0, searchData.children - 1) })}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{searchData.children}</span>
                  <button
                    type="button"
                    onClick={() => setSearchData({ ...searchData, children: searchData.children + 1 })}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Rooms */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
                  <span className="font-medium text-gray-900">Rooms</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSearchData({ ...searchData, rooms: Math.max(1, searchData.rooms - 1) })}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{searchData.rooms}</span>
                  <button
                    type="button"
                    onClick={() => setSearchData({ ...searchData, rooms: searchData.rooms + 1 })}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={updateGuests}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        .animate-gradient {
          background: linear-gradient(-45deg, #22d3ee, #3b82f6, #8b5cf6, #ec4899);
          background-size: 400% 400%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}

export default Hero;