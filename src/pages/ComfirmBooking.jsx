import React, { useState, useEffect } from 'react';
// In a real app, you'd use this to get data passed from the previous page
// import { useLocation } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

function ConfirmBooking() {
  // const location = useLocation();
  // const bookingDataFromPrevPage = location.state?.bookingDetails;
  
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // For now, we'll use dummy data. In a real app, you would use the
    // 'bookingDataFromPrevPage' from useLocation() instead.
    const dummyData = {
      roomType: 'Qui Nam dolores fugi',
      guests: {
        adults: 2,
        children: 0,
      },
      rooms: 1,
      dates: {
        start: 'October 28, 2025',
        end: 'October 30, 2025',
      },
      totalPrice: 50,
      selectedRoom: {
        image: 'https://via.placeholder.com/150x100/3B82F6/FFFFFF?text=Room',
        title: 'Selected Room',
        rating: 0.0,
        reviews: 0,
        beds: 78,
        bedrooms: 54,
        baths: 14,
      }
    };
    setBookingDetails(dummyData);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <AiFillStar key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'} />
    ));
  };

  if (!bookingDetails) {
    return <div>Loading booking details...</div>; // Or a proper loading spinner
  }

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      {/* Header */}
      <header className="bg-red-600 shadow-sm p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Tripeoo</h1>
          <nav>
            <a href="#" className="text-white hover:underline">Travelers</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left Column: Finalize Booking Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Finalize Your Booking After the Chat</h2>
            
            <div className="space-y-4 text-gray-700 text-lg mb-6">
              <p><span className="font-semibold">Room Type:</span> {bookingDetails.roomType}</p>
              <p><span className="font-semibold">Guests:</span> {bookingDetails.guests.adults} Adults, {bookingDetails.guests.children} Children</p>
              <p><span className="font-semibold">Rooms:</span> {bookingDetails.rooms}</p>
              <p><span className="font-semibold">Dates:</span> {bookingDetails.dates.start} to {bookingDetails.dates.end}</p>
              <p className="text-blue-600 font-bold text-xl border-t pt-4 mt-4">
                Total Price: ₹{bookingDetails.totalPrice}
              </p>
            </div>
            
            <div>
              <label htmlFor="special-request" className="block text-lg font-semibold text-gray-800 mb-2">Special Request</label>
              <textarea
                id="special-request"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any special requests? (Optional)"
              ></textarea>
            </div>

            <button className="w-full md:w-auto mt-8 bg-red-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-red-700 transition text-lg">
              Chat with Travel Provider
            </button>
          </div>

          {/* Right Column: Selected Room Card */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-4">
                <img 
                  src={bookingDetails.selectedRoom.image} 
                  alt="Selected Room"
                  className="w-32 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{bookingDetails.selectedRoom.title}</h3>
                  <div className="flex items-center text-gray-500 mt-1">
                    <div className="flex mr-1">{renderStars(bookingDetails.selectedRoom.rating)}</div>
                    <span>({bookingDetails.selectedRoom.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="border-t mt-4 pt-4 space-y-2 text-gray-600">
                <p>Beds: {bookingDetails.selectedRoom.beds}</p>
                <p>Bedrooms: {bookingDetails.selectedRoom.bedrooms}</p>
                <p>Baths: {bookingDetails.selectedRoom.baths}</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default ConfirmBooking;