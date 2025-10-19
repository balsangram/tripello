import React, { useState, useEffect } from 'react';

// --- Helper Components for Icons ---
// You can replace these with an icon library like lucide-react if you prefer
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);
const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const StarIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);


// --- Dummy Data (simulating an API response) ---
const dummyBookings = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
    name: 'The Grand Palace Hotel',
    status: 'Pending',
    roomType: 'Deluxe Sea View',
    checkInDate: '2025-10-28',
    checkOutDate: '2025-10-30',
    guests: { adults: 2, children: 0, rooms: 1 },
    price: 195,
    rating: 4.8,
    reviews: 125
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop',
    name: 'Lakeside Serenity Resort',
    status: 'Confirmed',
    roomType: 'Standard Suite',
    checkInDate: '2025-11-15',
    checkOutDate: '2025-11-20',
    guests: { adults: 2, children: 1, rooms: 1 },
    price: 250,
    rating: 4.5,
    reviews: 88
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?q=80&w=2070&auto=format&fit=crop',
    name: 'Metropolis Business Hotel',
    status: 'Cancelled',
    roomType: 'Executive King',
    checkInDate: '2025-09-05',
    checkOutDate: '2025-09-07',
    guests: { adults: 1, children: 0, rooms: 1 },
    price: 150,
    rating: 4.2,
    reviews: 210
  }
];

const statusStyles = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Confirmed': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
};

// --- Child Components ---
function UserProfile() {
  return (
    <div className="w-full lg:w-1/4 xl:w-1/5 bg-white rounded-xl shadow-md p-6 h-fit">
      <div className="flex flex-col items-center">
        <img 
          src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1760&auto=format&fit=crop"
          alt="User"
          className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-indigo-200"
        />
        <h2 className="text-xl font-bold text-gray-800">Sipu</h2>
        <p className="text-gray-500 text-sm">user@gmail.com</p>
      </div>
      <div className="mt-8 space-y-4 text-gray-700">
        <div className="flex items-center space-x-3">
            <UserIcon />
            <span>Male</span>
        </div>
        <div className="flex items-center space-x-3">
            <CalendarIcon />
            <span>2024-12-09</span>
        </div>
        <div className="flex items-center space-x-3">
            <PhoneIcon />
            <span>8986000099</span>
        </div>
        <div className="flex items-center space-x-3">
            <MapPinIcon />
            <span>Bangalore</span>
        </div>
      </div>
    </div>
  );
}

function BookingCard({ booking }) {
    const { 
      imageUrl, name, status, roomType, 
      checkInDate, checkOutDate, guests, 
      price, rating, reviews 
    } = booking;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row mb-6">
            <div className="md:w-1/3">
                 <img className="h-full w-full object-cover" src={imageUrl} alt={name} />
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
                            {status}
                        </span>
                    </div>
                    <p className="text-gray-600 mt-1">{roomType}</p>
                    <p className="text-sm text-gray-500 mt-4">{new Date(checkInDate).toLocaleDateString()} - {new Date(checkOutDate).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500">{guests.adults} Adults, {guests.children} Children ({guests.rooms} Room)</p>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex items-center">
                        <p className="text-xl font-bold text-indigo-600">${price}</p>
                        <p className="text-sm text-gray-500 ml-2">/ night</p>
                    </div>
                     <div className="flex items-center mt-4 sm:mt-0">
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-700 font-semibold ml-1">{rating}</span>
                        <span className="text-gray-500 text-sm ml-2">({reviews} reviews)</span>
                     </div>
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                        <a href="#" className="text-sm text-indigo-600 hover:underline">Leave a review</a>
                        <button className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">
                            Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


// --- Main Page Component ---
export default function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect is the right place to fetch data from an API.
  // Here, we simulate it with a timeout.
  useEffect(() => {
    const fetchBookings = () => {
      // --- API Call Simulation ---
      // In a real app, you would use fetch() or axios here:
      // fetch('https://api.example.com/bookings')
      //   .then(res => res.json())
      //   .then(data => {
      //     setBookings(data);
      //     setIsLoading(false);
      //   });
      
      // Simulating a 1-second network delay
      setTimeout(() => {
        setBookings(dummyBookings);
        setIsLoading(false);
      }, 1000);
    };

    fetchBookings();
  }, []); // The empty array [] means this effect runs once when the component mounts.


  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* User Profile Section (Left) */}
        <UserProfile />

        {/* Bookings Section (Right) */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-6">
              <span className="px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded-lg">Stays</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900">Your Bookings</h1>
            <p className="text-gray-500 mt-2">View, manage, or cancel your reservations.</p>
            
            <div className="mt-8">
              {isLoading ? (
                <p className="text-center text-gray-500">Loading your bookings...</p>
              ) : bookings.length > 0 ? (
                bookings.map(booking => <BookingCard key={booking.id} booking={booking} />)
              ) : (
                <p className="text-center text-gray-500">You have no bookings.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
