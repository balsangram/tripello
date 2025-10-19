import React, { useState, useEffect, useCallback } from 'react';

// --- Inlined SVG Icons to remove external dependencies ---

const WifiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>;
const CoffeeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>;
const CarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16.5 17.5 13H22v-2h-4.5l-3.5 3.5"></path><path d="m5.5 16.5-3-3H1v2h1.5l3 3"></path><path d="M3 10h18v6H3z"></path><path d="m12 10-1.5-8-5 8"></path><path d="m12 10 1.5-3h4l-2 3"></path></svg>;
const WorkspaceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M5 17v3a2 2 0 0 0 2 2h2"></path></svg>;
const PoolIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"></path><path d="m12 6-2 3h4l-2 3"></path><path d="M12 12v6"></path></svg>;
const GrillIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10H2"></path><path d="M20 6H4"></path><path d="M22 14H2"></path><path d="M20 18H4"></path><path d="m15 10-3.5 4-3.5-4"></path><path d="m15 14-3.5 4-3.5-4"></path><path d="M15 6 12 2 9 6"></path></svg>;
const PoolTableIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 18a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8z"></path><path d="M2 18h10"></path><path d="M4 14h8"></path><path d="M6 10h6"></path><circle cx="6" cy="18" r="2"></circle><circle cx="18" cy="18" r="2"></circle></svg>;
const DumbbellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6.5 6.5 11 11"></path><path d="m21 21-1-1"></path><path d="m3 3 1 1"></path><path d="m18 22 4-4"></path><path d="m6 8-4 4"></path><path d="m15 5-1-1"></path><path d="m9 19-1-1"></path></svg>;
const HotTubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10V8a2 2 0 0 0-2-2h-3"></path><path d="M3 10V8a2 2 0 0 1 2-2h3"></path><path d="M12 2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path><path d="M21 16v-2a2 2 0 0 0-2-2h-2"></path><path d="M3 16v-2a2 2 0 0 1 2-2h2"></path><path d="M12 22a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2z"></path><path d="M6 12H5a2 2 0 0 0-2 2v2"></path><path d="M18 12h1a2 2 0 0 1 2 2v2"></path></svg>;
const SkiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 2.5 3 18 2 22l4-1 15-10.5z"></path><path d="m20.5 7.5-8-5"></path><path d="m6 14 3 3"></path><path d="M10 10 3 13.5"></path></svg>;
const ShowerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m4 4 2.5 2.5"></path><path d="M13.5 6.5a4.5 4.5 0 0 0-6.364 6.364"></path><path d="m20 12-1.5 3h4l-2 3"></path><path d="M14 17.5a4.5 4.5 0 0 0 6.364-6.364"></path><path d="M12 22v-4"></path><path d="M9 16H3"></path><path d="M16 9v6"></path></svg>;
const FireExtinguisherIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5"></path><path d="M9 16H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1"></path><path d="M15 9h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"></path><path d="M12 9a2 2 0 0 0-2 2v8h4v-8a2 2 0 0 0-2-2z"></path><path d="M12 15.5V13"></path></svg>;
const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-3-6-6"></path></svg>;
const BathIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10H3v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8z"></path><path d="M5 10V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"></path><path d="M4 14h16"></path></svg>;
const SquareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect></svg>;
const BedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"></path><path d="M2 10h20"></path><path d="M6 14v-4"></path></svg>;
const StarIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" className={className} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;


const LocationComponent = ({ details }) => {
    if (!details) return null;
    return (
        <section className="border-b pb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Location</h3>
            <img src={details.mapImage} alt="Map" className="rounded-lg mb-4 w-full h-64 object-cover" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="font-semibold">{details.ratingDescription} Location</p>
                    <div className="flex items-center">
                        <span className="text-lg font-bold text-blue-600 mr-2">{details.rating}</span>
                        <div className="flex text-yellow-500">{Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}</div>
                    </div>
                    <p className="text-sm text-gray-600">Guests are raving about the exceptional location.</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">What's nearby?</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {details.landmarks.map(landmark => (
                            <li key={landmark.name}>{landmark.name} - {landmark.distance}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

const ImageGallery = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = useCallback(() => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, images]);

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, images]);

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        const timer = setTimeout(goToNext, 5000);
        return () => clearTimeout(timer);
    }, [currentIndex, goToNext]);


    if (!images || images.length === 0) {
        return <div>No Images Available</div>;
    }

    return (
        <div className="relative w-full h-[550px] rounded-xl overflow-hidden shadow-lg">
            <div
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
                className="w-full h-full bg-center bg-cover duration-500 transition-transform ease-in-out"
            ></div>
            <div
                onClick={goToPrevious}
                className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white text-3xl cursor-pointer bg-black/30 rounded-full p-2 hover:bg-black/50 transition"
            >
                <ChevronLeftIcon />
            </div>
            <div
                onClick={goToNext}
                className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white text-3xl cursor-pointer bg-black/30 rounded-full p-2 hover:bg-black/50 transition"
            >
                <ChevronRightIcon />
            </div>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

function RoomDetail() {
    const [roomData, setRoomData] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const dummyData = {
            images: [
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1540541338287-417002075841?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
            ],
            title: 'Luxury Lakeside Villa',
            pricePerNight: 25,
            rating: 4,
            reviews: 12,
            location: 'Bhadrak',
            host: {
                name: 'Admin User',
                profileImage: 'https://i.pravatar.cc/150?u=admin',
                joinedDate: 'March 2018',
                responseRate: '100%',
                responseTime: 'within a few hours',
                placesHosted: 3,
                about: "Providing lake views, this accommodation offers an outdoor swimming pool, a bar, a shared lounge, a garden, and barbecue facilities...",
            },
            guests: 8,
            beds: 4,
            baths: 2,
            bedrooms: 3,
            roomTypes: [
                {
                    id: 1,
                    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9c9c703?q=80&w=2070&auto=format&fit=crop',
                    name: 'Standard Room',
                    beds: 2,
                    baths: 1,
                    sqFt: 1200,
                    price: 25,
                    features: ['4 Network', 'Family'],
                },
            ],
            stayInformation: 'This room is perfect for a family getaway or a trip with friends, offering stunning views and modern comforts.',
            amenities: [
                { icon: <WifiIcon />, name: 'Wifi' },
                { icon: <CoffeeIcon />, name: 'Washing machine' },
                { icon: <CarIcon />, name: 'Free parking on premises' },
                { icon: <WorkspaceIcon />, name: 'Dedicated workspace' },
                { icon: <PoolIcon />, name: 'Pool' },
                { icon: <GrillIcon />, name: 'BBQ grill' },
                { icon: <PoolTableIcon />, name: 'Pool table' },
                { icon: <DumbbellIcon />, name: 'Exercise equipment' },
                { icon: <HotTubIcon />, name: 'Lake access' },
                { icon: <SkiIcon />, name: 'Ski-in/out' },
                { icon: <ShowerIcon />, name: 'Outdoor shower' },
                { icon: <FireExtinguisherIcon />, name: 'Fire extinguisher' },
            ],
            availability: {
                month: 'October',
                year: 2025,
                firstDayOfMonth: 3,
                daysInMonth: 31,
            },
            cancellationPolicy: 'Full refund for cancellations made within 48 hours of booking...',
            checkInTime: '06:04 PM',
            checkOutTime: '08:19 AM',
            specialNote: [
                'Guests are expected to keep the environment green and clean.',
                'No loud music or parties after 11:30 PM.',
            ],
            locationDetails: {
                latitude: 24.5755,
                longitude: 73.6817,
                mapImage: 'https://images.unsplash.com/photo-1593178358510-18a5312338b3?q=80&w=1943&auto=format&fit=crop',
                rating: '9.8',
                ratingDescription: 'Exceptional',
                distanceFromCenter: '220 meters',
                landmarks: [
                    { name: 'Jagmandir', distance: '90 m' },
                    { name: 'City Palace of Udaipur', distance: '1.2 km' },
                    { name: 'Bagore Ki Haveli Museum', distance: '1.4 km' },
                    { name: 'Jagdish Temple', distance: '1.5 km' },
                ],
            },
        };
        setRoomData(dummyData);
    }, []);

    useEffect(() => {
        if (roomData) {
            const nights = selectedDates.length > 1 ? selectedDates.length - 1 : 0;
            setTotalPrice(nights * roomData.pricePerNight);
        }
    }, [selectedDates, roomData]);

    const handleDateSelect = (day) => {
        if (selectedDates.length === 0 || selectedDates.length === 2) {
            setSelectedDates([day]);
        } else if (selectedDates.length === 1) {
            const startDate = selectedDates[0];
            const endDate = day;
            if (startDate < endDate) {
                const range = Array.from({ length: endDate - startDate + 1 }, (_, i) => startDate + i);
                setSelectedDates(range);
            } else {
                setSelectedDates([day]);
            }
        }
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'} />
        ));
    };

    const renderCalendar = () => {
        if (!roomData) return null;
        const { firstDayOfMonth, daysInMonth } = roomData.availability;
        const blanks = Array.from({ length: firstDayOfMonth });
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        return (
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="font-semibold text-gray-700">{day}</div>
                ))}
                {blanks.map((_, i) => <div key={`blank-${i}`}></div>)}
                {days.map(day => {
                    const isSelected = selectedDates.includes(day);
                    const isBooked = day === 20;
                    return (
                        <div
                            key={day}
                            className={`p-2 border rounded-lg cursor-pointer transition-colors
                            ${isBooked ? 'bg-gray-200 text-gray-400 line-through cursor-not-allowed' : 'hover:bg-blue-100'}
                            ${isSelected && !isBooked ? 'bg-blue-600 text-white' : ''}
                        `}
                            onClick={() => !isBooked && handleDateSelect(day)}
                        >
                            <p className="font-semibold">{day}</p>
                            <p className="text-xs">₹{roomData.pricePerNight}</p>
                        </div>
                    );
                })}
            </div>
        );
    };

    const handleReserve = () => {
        window.location.href = 'http://localhost:5174/ConfirmBooking';
    };

    if (!roomData) {
        return <div className="flex justify-center items-center h-screen">Loading room details...</div>;
    }

    return (
        <div className="bg-gray-50 font-sans">
            <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-red-600">Tripeoo</h1>
                    <nav>
                        <a href="#" className="text-gray-700 hover:text-red-600">User Profile</a>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <ImageGallery images={roomData.images} />
                    </section>

                    <section className="flex justify-between items-start border-b pb-6">
                        <div>
                            <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full mb-2 inline-block">Villas</span>
                            <h2 className="text-3xl font-bold text-gray-900">{roomData.title}</h2>
                            <div className="flex items-center text-gray-600 mt-2">
                                <div className="flex mr-2">{renderStars(roomData.rating)}</div>
                                <span>{roomData.reviews} reviews</span>
                                <span className="mx-2">•</span>
                                <span>{roomData.location}</span>
                            </div>
                        </div>
                    </section>

                    <section className="border-b pb-6">
                        <div className="flex items-center">
                            <img src={roomData.host.profileImage} alt="Host" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <h3 className="text-xl font-semibold">Hosted by {roomData.host.name}</h3>
                                <p className="text-gray-600">{`${roomData.guests} guests · ${roomData.bedrooms} bedrooms · ${roomData.beds} beds · ${roomData.baths} baths`}</p>
                            </div>
                        </div>
                    </section>

                    <section className="border-b pb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Room Types</h3>
                        {roomData.roomTypes.map(rt => (
                            <div key={rt.id} className="border rounded-lg p-4 flex flex-col md:flex-row items-center gap-4">
                                <img src={rt.image} alt={rt.name} className="w-full md:w-40 h-32 object-cover rounded-lg" />
                                <div className="flex-grow">
                                    <div className="flex space-x-2 mb-2">
                                        {rt.features.map((f, i) => <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{f}</span>)}
                                    </div>
                                    <p className="font-semibold text-lg">{rt.name}</p>
                                    <div className="flex items-center text-gray-600 text-sm space-x-4 mt-1">
                                        <span className="flex items-center"><BedIcon /> {rt.beds} beds</span>
                                        <span className="flex items-center"><BathIcon /> {rt.baths} baths</span>
                                        <span className="flex items-center"><SquareIcon /> {rt.sqFt} Sq. Ft.</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-green-600">₹{rt.price}</p>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="border-b pb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Availability</h3>
                        <p className="text-gray-600 mb-4">Prices may increase on weekends or holidays</p>
                        <div className="flex justify-between items-center mb-4">
                            <button className="text-gray-500 p-2 rounded-full hover:bg-gray-200">&lt;</button>
                            <h4 className="text-lg font-semibold">{roomData.availability.month} {roomData.availability.year}</h4>
                            <button className="text-gray-500 p-2 rounded-full hover:bg-gray-200">&gt;</button>
                        </div>
                        {renderCalendar()}
                    </section>

                    <section className="border-b pb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">What this place offers</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {roomData.amenities.map(a => (
                                <div key={a.name} className="flex items-center text-gray-800">
                                    <span className="mr-3 text-2xl">{a.icon}</span>
                                    <span>{a.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <LocationComponent details={roomData.locationDetails} />

                    <section className="border-b pb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">About the Host</h3>
                        <div className="flex items-center mb-4">
                            <img src={roomData.host.profileImage} alt="Host Profile" className="w-16 h-16 rounded-full mr-4" />
                            <div>
                                <p className="text-xl font-semibold">{roomData.host.name}</p>
                                <p className="text-gray-600">Joined {roomData.host.joinedDate}</p>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-4">{roomData.host.about}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-gray-700">
                            <div>Response rate: <span className="font-semibold">{roomData.host.responseRate}</span></div>
                            <div>Response time: <span className="font-semibold">{roomData.host.responseTime}</span></div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Things to know</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h4 className="font-semibold mb-2">Cancellation policy</h4>
                                <p className="text-sm text-gray-600">{roomData.cancellationPolicy}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Check-in & Check-out</h4>
                                <p className="text-sm text-gray-600">Check-in: {roomData.checkInTime}</p>
                                <p className="text-sm text-gray-600">Check-out: {roomData.checkOutTime}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Special Notes</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600">
                                    {roomData.specialNote.map((note, i) => <li key={i}>{note}</li>)}
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                <aside className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
                        <div className="flex items-baseline mb-4">
                            <p className="text-3xl font-bold text-gray-900">₹{roomData.pricePerNight}</p>
                            <span className="text-gray-600 ml-1">/night</span>
                        </div>

                        <div className="border border-gray-300 rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700">CHECK-IN</label>
                                    <p>{selectedDates.length > 0 ? `Oct ${selectedDates[0]}, 2025` : 'Add date'}</p>
                                </div>
                                <div className="border-r h-8"></div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700">CHECKOUT</label>
                                    <p>{selectedDates.length > 1 ? `Oct ${selectedDates[selectedDates.length - 1]}, 2025` : 'Add date'}</p>
                                </div>
                            </div>
                            <div className="border-t pt-2">
                                <label htmlFor="guests" className="block text-xs font-bold text-gray-700">GUESTS & ROOMS</label>
                                <select id="guests" className="w-full border-none p-0 focus:ring-0">
                                    <option>2 Adults, 1 Room</option>
                                    <option>1 Adult, 1 Room</option>
                                    <option>3 Adults, 2 Rooms</option>
                                </select>
                            </div>
                        </div>

                        <button onClick={handleReserve} className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                            Reserve
                        </button>

                        <p className="text-center text-sm text-gray-500 my-4">You won't be charged yet</p>

                        <div className="space-y-2 text-gray-700">
                            <p className="flex justify-between">
                                <span>₹{roomData.pricePerNight} x {selectedDates.length > 1 ? selectedDates.length - 1 : 0} nights</span>
                                <span>₹{totalPrice}</span>
                            </p>
                            <p className="flex justify-between">
                                <span>Cleaning fee</span>
                                <span>₹50</span>
                            </p>
                            <p className="flex justify-between">
                                <span>Service fee</span>
                                <span>₹20</span>
                            </p>
                        </div>

                        <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{totalPrice > 0 ? totalPrice + 50 + 20 : 0}</span>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}

export default RoomDetail;