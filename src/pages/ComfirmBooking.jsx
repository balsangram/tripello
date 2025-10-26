import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiFillStar, AiOutlineUser, AiOutlineTeam, AiOutlineHome, AiOutlineCalendar } from 'react-icons/ai';
import { FaBed, FaBath, FaDoorOpen } from 'react-icons/fa';
import { apiHandler } from '../utils/api';

function ConfirmBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingDataFromPrevPage = location.state?.bookingDetails;

  const [bookingDetails, setBookingDetails] = useState(null);
  const [specialRequest, setSpecialRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bookingDataFromPrevPage) {
      setBookingDetails(bookingDataFromPrevPage);
      console.log('Received booking data:', bookingDataFromPrevPage);
    } else {
      // Fallback to dummy data if no data passed
      const dummyData = {
        roomType: 'Deluxe Ocean View Suite',
        guests: {
          adults: 2,
          children: 1,
          rooms: 1,
        },
        dates: {
          startDisplay: 'October 28, 2025',
          endDisplay: 'October 30, 2025',
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
      console.warn('No booking data received, using dummy data');
    }
  }, [bookingDataFromPrevPage]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <AiFillStar
        key={i}
        className={i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}
        size={18}
      />
    ));
  };

  const handleChatClick = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if user is logged in
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      if (!userData.user || !userData.user._id) {
        alert('Please login to create a booking');
        navigate('/login');
        return;
      }

      console.log('User logged in as:', userData.user);

      const bookingPayload = {
        user_id: userData.user._id, // Explicitly pass user_id
        stay_id: bookingDetails.stayId,
        roomTypeId: bookingDetails.roomTypeId,
        numAdults: bookingDetails.guests.adults,
        numChildren: bookingDetails.guests.children || 0,
        numRooms: bookingDetails.guests.rooms || 1,
        startDate: bookingDetails.dates.checkIn,
        endDate: bookingDetails.dates.checkOut,
        totalPrice: bookingDetails.totalPrice,
        userMessage: specialRequest || '',
      };

      console.log('Creating booking before chat:', bookingPayload);

      const response = await apiHandler({
        url: '/booking',
        method: 'POST',
        data: bookingPayload,
        requireAuth: true,
      });

      console.log('Booking created successfully:', response);
      
      if (response.success && response.booking_id) {
        // Navigate to chat with booking ID
        navigate('/chat-with-us', { 
          state: { 
            bookingId: response.booking_id,
            bookingDetails: response.data 
          } 
        });
      } else {
        throw new Error('Invalid booking response');
      }
    } catch (err) {
      console.error('Booking error:', err);
      const errorMessage = err.message || err.error || 'Failed to create booking. Please try again.';
      setError(errorMessage);
      
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
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
      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Finalize Booking Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Booking</h2>
              <p className="text-gray-600">Review your details and chat with the provider to complete your booking</p>
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
                        {bookingDetails.guests.adults} Adults{bookingDetails.guests.children ? `, ${bookingDetails.guests.children} Children` : ''}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <AiOutlineUser className="mr-3 text-gray-500" size={20} />
                    <div>
                      <p className="font-medium">Rooms</p>
                      <p className="text-gray-900 font-semibold">{bookingDetails.guests.rooms || 1}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <AiOutlineCalendar className="mr-3 text-gray-500" size={20} />
                    <div>
                      <p className="font-medium">Dates</p>
                      <p className="text-gray-900 font-semibold">
                        {bookingDetails.dates.startDisplay} to {bookingDetails.dates.endDisplay}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total Price</span>
                  <span className="text-2xl font-bold text-blue-700">₹{bookingDetails.totalPrice}</span>
                </div>
                {bookingDetails.priceBreakdown && bookingDetails.priceBreakdown.basePrice && (
                  <div className="text-sm text-gray-600 mt-2">
                    <p>Base Price: ₹{bookingDetails.priceBreakdown.basePrice}</p>
                  </div>
                )}
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
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none"
                placeholder="Any special requests or preferences? (Optional)"
              ></textarea>
              <p className="text-sm text-gray-500 mt-2">We'll do our best to accommodate your needs</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border-2 border-red-300 rounded-xl">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold text-red-800">Booking Failed</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                    {error.includes('User not found') && (
                      <p className="text-xs text-red-600 mt-2">
                        Please make sure you are logged in. <a href="/login" className="underline font-semibold">Click here to login</a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleChatClick}
                disabled={loading}
                className="flex-1 bg-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Chat with Us to Confirm Booking'}
              </button>
              <button 
                onClick={() => navigate(-1)}
                className="flex-1 bg-white text-gray-800 py-4 px-6 rounded-xl font-semibold border-2 border-gray-300 hover:border-red-500 hover:text-red-600 transition-all text-lg"
              >
                Go Back
              </button>
            </div>

            <p className="text-center text-gray-600 mt-6 text-sm">
              By proceeding, you agree to our Terms of Service and Privacy Policy
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