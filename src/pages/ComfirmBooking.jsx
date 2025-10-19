import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// In a real app, you'd use this to get data passed from the previous page
// import { useLocation } from 'react-router-dom';
import { AiFillStar, AiOutlineUser, AiOutlineTeam, AiOutlineHome, AiOutlineCalendar } from 'react-icons/ai';
import { FaBed, FaBath, FaDoorOpen } from 'react-icons/fa';

function ConfirmBooking() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const bookingDataFromPrevPage = location.state?.bookingDetails;

  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // For now, we'll use dummy data. In a real app, you would use the
    // 'bookingDataFromPrevPage' from useLocation() instead.
    const dummyData = {
      roomType: 'Deluxe Ocean View Suite',
      guests: {
        adults: 2,
        children: 1,
      },
      rooms: 1,
      dates: {
        start: 'October 28, 2025',
        end: 'October 30, 2025',
      },
      totalPrice: 249.99,
      selectedRoom: {
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        title: 'Luxury Beachfront Villa',
        rating: 4.7,
        reviews: 128,
        beds: 2,
        bedrooms: 1,
        baths: 1,
        amenities: ['Free WiFi', 'Air Conditioning', 'Ocean View', 'Private Balcony']
      }
    };
    setBookingDetails(dummyData);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <AiFillStar
        key={i}
        className={i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}
        size={18}
      />
    ));
  };

  const handleChatClick = () => {
    navigate('/chatWithUs');
  };

  if (!bookingDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 font-sans min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg p-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">Tripeoo</h1>
          <nav>
            <a href="#" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Travelers</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Finalize Booking Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Confirm Your Booking</h2>
              <p className="text-gray-600">Review your details and complete your reservation</p>
            </div>

            {/* Booking Summary Card */}
            <div className="bg-blue-50 p-6 rounded-xl mb-8 border border-blue-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <AiOutlineCalendar className="mr-2 text-blue-600" />
                Booking Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <AiOutlineHome className="mr-3 text-gray-500" size={20} />
                    <div>
                      <p className="font-medium">Room Type</p>
                      <p className="text-gray-900 font-semibold">{bookingDetails.roomType}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <AiOutlineTeam className="mr-3 text-gray-500" size={20} />
                    <div>
                      <p className="font-medium">Guests</p>
                      <p className="text-gray-900 font-semibold">
                        {bookingDetails.guests.adults} Adults, {bookingDetails.guests.children} Children
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <AiOutlineUser className="mr-3 text-gray-500" size={20} />
                    <div>
                      <p className="font-medium">Rooms</p>
                      <p className="text-gray-900 font-semibold">{bookingDetails.rooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <AiOutlineCalendar className="mr-3 text-gray-500" size={20} />
                    <div>
                      <p className="font-medium">Dates</p>
                      <p className="text-gray-900 font-semibold">
                        {bookingDetails.dates.start} to {bookingDetails.dates.end}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total Price</span>
                  <span className="text-2xl font-bold text-blue-700">${bookingDetails.totalPrice}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Includes all taxes and fees</p>
              </div>
            </div>

            {/* Special Request Section */}
            <div className="mb-8">
              <label htmlFor="special-request" className="block text-lg font-semibold text-gray-800 mb-3">
                Special Requests
              </label>
              <textarea
                id="special-request"
                rows="4"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                placeholder="Any special requests or preferences? (Optional)"
              ></textarea>
              <p className="text-sm text-gray-500 mt-2">We'll do our best to accommodate your needs</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleChatClick}
                className="flex-1 bg-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
              >
                Chat with Travel Provider
              </button>
              <button className="flex-1 bg-white text-gray-800 py-4 px-6 rounded-xl font-semibold border-2 border-gray-300 hover:border-red-500 hover:text-red-600 transition-all text-lg">
                Save for Later
              </button>
            </div>

            <p className="text-center text-gray-600 mt-6 text-sm">
              By completing this booking, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>

          {/* Right Column: Selected Room Card */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
              <div className="mb-4">
                <img
                  src={bookingDetails.selectedRoom.image}
                  alt="Selected Room"
                  className="w-full h-48 object-cover rounded-xl shadow-md"
                />
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{bookingDetails.selectedRoom.title}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <div className="flex mr-2">{renderStars(bookingDetails.selectedRoom.rating)}</div>
                  <span className="font-medium">{bookingDetails.selectedRoom.rating}</span>
                  <span className="mx-2">•</span>
                  <span>({bookingDetails.selectedRoom.reviews} reviews)</span>
                </div>
              </div>

              <div className="border-t border-b border-gray-200 py-4 mb-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <FaBed className="text-gray-600 mb-1" size={20} />
                    <span className="text-sm font-medium text-gray-700">{bookingDetails.selectedRoom.beds} Beds</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaDoorOpen className="text-gray-600 mb-1" size={20} />
                    <span className="text-sm font-medium text-gray-700">{bookingDetails.selectedRoom.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaBath className="text-gray-600 mb-1" size={18} />
                    <span className="text-sm font-medium text-gray-700">{bookingDetails.selectedRoom.baths} Baths</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {bookingDetails.selectedRoom.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <p className="text-green-800 text-sm font-medium text-center">
                  ✓ Free cancellation up to 24 hours before check-in
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default ConfirmBooking;