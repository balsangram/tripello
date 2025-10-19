import React, { useState, useEffect } from "react";
import {
    FiSearch,
    FiMapPin,
    FiCalendar,
    FiUsers,
    FiFilter,
    FiX,
    FiStar,
    FiHeart,
    FiShare2,
    FiEye,
    FiChevronDown,
    FiGrid,
    FiList
} from "react-icons/fi";
import {
    FaWifi,
    FaSwimmingPool,
    FaParking,
    FaUtensils,
    FaSnowflake,
    FaDumbbell,
    FaHotTub
} from "react-icons/fa";

function SearchPage() {
    const [searchData, setSearchData] = useState({
        location: "",
        checkIn: "",
        checkOut: "",
        guests: "2 Adults",
        rooms: "1 Room"
    });

    const [activeTab, setActiveTab] = useState("stays");
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("recommended");
    const [priceRange, setPriceRange] = useState([1000, 15000]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    const tabs = [
        { id: "stays", label: "🏠 Stays", icon: "🏠" },
        { id: "tours", label: "🚗 Tours", icon: "🚗" },
        { id: "activities", label: "🎯 Activities", icon: "🎯" },
        { id: "packages", label: "🎒 Packages", icon: "🎒" }
    ];

    const amenities = [
        { id: "wifi", label: "Free WiFi", icon: FaWifi },
        { id: "pool", label: "Swimming Pool", icon: FaSwimmingPool },
        { id: "parking", label: "Parking", icon: FaParking },
        { id: "restaurant", label: "Restaurant", icon: FaUtensils },
        { id: "ac", label: "Air Conditioning", icon: FaSnowflake },
        { id: "gym", label: "Fitness Center", icon: FaDumbbell },
        { id: "spa", label: "Spa", icon: FaHotTub }
    ];

    const sortOptions = [
        { value: "recommended", label: "Recommended" },
        { value: "price-low", label: "Price: Low to High" },
        { value: "price-high", label: "Price: High to Low" },
        { value: "rating", label: "Highest Rated" },
        { value: "popular", label: "Most Popular" }
    ];

    const popularDestinations = [
        "Goa", "Manali", "Kerala", "Rajasthan", "Himachal", "Mumbai", "Delhi", "Bangalore"
    ];

    // Sample search results data
    const searchResults = [
        {
            id: 1,
            title: "Luxury Beach Resort",
            description: "5-star beachfront resort with private pool and spa services",
            location: "Goa Beach, Goa",
            price: 12500,
            originalPrice: 15000,
            rating: 4.8,
            reviews: 892,
            images: [
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1578683015141-738c7604b2fd?w=800&h=600&fit=crop"
            ],
            amenities: ["wifi", "pool", "spa", "restaurant", "ac", "gym"],
            type: "resort",
            discount: 17,
            isFeatured: true
        },
        {
            id: 2,
            title: "Mountain View Cottage",
            description: "Cozy cottage with panoramic mountain views and fireplace",
            location: "Manali, Himachal Pradesh",
            price: 6800,
            originalPrice: 7500,
            rating: 4.6,
            reviews: 456,
            images: [
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
            ],
            amenities: ["wifi", "parking", "ac"],
            type: "cottage",
            discount: 9,
            isFeatured: false
        },
        {
            id: 3,
            title: "City Center Hotel",
            description: "Modern hotel in heart of city with business facilities",
            location: "Bangalore, Karnataka",
            price: 4200,
            originalPrice: 4200,
            rating: 4.3,
            reviews: 1234,
            images: [
                "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
            ],
            amenities: ["wifi", "gym", "restaurant", "ac", "parking"],
            type: "hotel",
            discount: 0,
            isFeatured: true
        },
        {
            id: 4,
            title: "Heritage Palace Stay",
            description: "Royal experience in restored heritage property",
            location: "Udaipur, Rajasthan",
            price: 18900,
            originalPrice: 22000,
            rating: 4.9,
            reviews: 287,
            images: [
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1571003119718-97518273d7c0?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1564507592333-cdd2ae446de7?w=800&h=600&fit=crop"
            ],
            amenities: ["wifi", "pool", "spa", "restaurant", "parking"],
            type: "heritage",
            discount: 14,
            isFeatured: true
        },
        {
            id: 5,
            title: "Eco Tree House",
            description: "Sustainable tree house surrounded by nature",
            location: "Wayanad, Kerala",
            price: 3200,
            originalPrice: 3800,
            rating: 4.7,
            reviews: 634,
            images: [
                "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1551524161-1205e895bace?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1578683015141-738c7604b2fd?w=800&h=600&fit=crop"
            ],
            amenities: ["wifi", "parking"],
            type: "eco",
            discount: 16,
            isFeatured: false
        },
        {
            id: 6,
            title: "Luxury Penthouse",
            description: "Sky-high penthouse with city skyline views",
            location: "Mumbai, Maharashtra",
            price: 21500,
            originalPrice: 25000,
            rating: 4.8,
            reviews: 189,
            images: [
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
            ],
            amenities: ["wifi", "pool", "gym", "ac", "parking"],
            type: "penthouse",
            discount: 14,
            isFeatured: true
        }
    ];

    const handleSearchChange = (field, value) => {
        setSearchData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const toggleAmenity = (amenityId) => {
        setSelectedAmenities(prev =>
            prev.includes(amenityId)
                ? prev.filter(id => id !== amenityId)
                : [...prev, amenityId]
        );
    };

    const clearAllFilters = () => {
        setSelectedAmenities([]);
        setPriceRange([1000, 15000]);
        setSortBy("recommended");
    };

    const handleViewClick = (property) => {
        setSelectedProperty(property);
        setShowModal(true);
    };

    const handleBookNowClick = (property) => {
        window.location.href = `http://localhost:5174/roomsDetails?id=${property.id}`;
    };

    const filteredResults = searchResults.filter(result => {
        // Price filter
        if (result.price < priceRange[0] || result.price > priceRange[1]) return false;

        // Amenities filter
        if (selectedAmenities.length > 0) {
            return selectedAmenities.every(amenity => result.amenities.includes(amenity));
        }

        return true;
    });

    const sortedResults = [...filteredResults].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'popular':
                return b.reviews - a.reviews;
            default:
                return 0;
        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
            {/* Search Header */}
            <div className="bg-white shadow-lg border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search Tabs */}
                    <div className="flex overflow-x-auto scrollbar-hide border-b">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-300 border-b-2 ${activeTab === tab.id
                                    ? "border-blue-600 text-blue-600 bg-blue-50"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                <span className="text-lg">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Form */}
                    <div className="p-6">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                                {/* Location */}
                                <div className="relative group">
                                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500" />
                                    <input
                                        type="text"
                                        placeholder="Where are you going?"
                                        value={searchData.location}
                                        onChange={(e) => handleSearchChange("location", e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-300"
                                    />
                                </div>

                                {/* Check-in */}
                                <div className="relative group">
                                    <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500" />
                                    <input
                                        type="text"
                                        placeholder="Check-in date"
                                        value={searchData.checkIn}
                                        onChange={(e) => handleSearchChange("checkIn", e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg cursor-pointer transition-all duration-300"
                                    />
                                </div>

                                {/* Check-out */}
                                <div className="relative group">
                                    <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500" />
                                    <input
                                        type="text"
                                        placeholder="Check-out date"
                                        value={searchData.checkOut}
                                        onChange={(e) => handleSearchChange("checkOut", e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg cursor-pointer transition-all duration-300"
                                    />
                                </div>

                                {/* Guests & Search Button */}
                                <div className="flex gap-2">
                                    <div className="relative group flex-1">
                                        <FiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500" />
                                        <select
                                            value={searchData.guests}
                                            onChange={(e) => handleSearchChange("guests", e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg appearance-none cursor-pointer transition-all duration-300"
                                        >
                                            <option>1 Adult</option>
                                            <option>2 Adults</option>
                                            <option>2 Adults, 1 Child</option>
                                            <option>2 Adults, 2 Children</option>
                                            <option>Family (4+)</option>
                                        </select>
                                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>

                                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 min-w-[120px] justify-center">
                                        <FiSearch className="w-5 h-5" />
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Popular Destinations */}
                        <div className="flex flex-wrap gap-3 mt-4">
                            <span className="text-gray-600 font-medium">Popular:</span>
                            {popularDestinations.map((destination) => (
                                <button
                                    key={destination}
                                    onClick={() => handleSearchChange("location", destination)}
                                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition-all duration-300 text-sm font-medium"
                                >
                                    {destination}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className={`lg:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-900 text-lg">Filters</h3>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    Clear all
                                </button>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-4">Price Range</h4>
                                <div className="space-y-4">
                                    <input
                                        type="range"
                                        min="500"
                                        max="30000"
                                        step="500"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                    />
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>₹{priceRange[0].toLocaleString()}</span>
                                        <span>₹{priceRange[1].toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-4">Amenities</h4>
                                <div className="space-y-3">
                                    {amenities.map((amenity) => (
                                        <label key={amenity.id} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedAmenities.includes(amenity.id)}
                                                onChange={() => toggleAmenity(amenity.id)}
                                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                            <amenity.icon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm">
                                                {amenity.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Property Type */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-4">Property Type</h4>
                                <div className="space-y-2">
                                    {["Hotel", "Resort", "Villa", "Apartment", "Hostel", "Cottage"].map((type) => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                            <span className="text-gray-700 text-sm">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                        {sortedResults.length} Properties Found
                                    </h2>
                                    <p className="text-gray-600 flex items-center gap-2">
                                        <FiMapPin className="w-4 h-4" />
                                        {searchData.location || "Popular destinations"} •
                                        {searchData.checkIn && searchData.checkOut && ` ${searchData.checkIn} - ${searchData.checkOut}`}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* View Toggle */}
                                    <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                                        <button
                                            onClick={() => setViewMode("grid")}
                                            className={`p-2 rounded-lg transition-all ${viewMode === "grid"
                                                ? "bg-white text-blue-600 shadow-sm"
                                                : "text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            <FiGrid className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode("list")}
                                            className={`p-2 rounded-lg transition-all ${viewMode === "list"
                                                ? "bg-white text-blue-600 shadow-sm"
                                                : "text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            <FiList className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Sort */}
                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer text-sm"
                                        >
                                            {sortOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>

                                    {/* Mobile Filter Toggle */}
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors"
                                    >
                                        <FiFilter className="w-4 h-4" />
                                        Filters
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results Grid */}
                        <div className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6"
                                : "space-y-6"
                        }>
                            {sortedResults.map((property) => (
                                <div
                                    key={property.id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        {/* Image Section */}
                                        <div className="md:w-2/5 relative">
                                            <img
                                                src={property.images[0]}
                                                alt={property.title}
                                                className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />

                                            {/* Badges */}
                                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                                {property.isFeatured && (
                                                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                                        ⭐ Featured
                                                    </span>
                                                )}
                                                {property.discount > 0 && (
                                                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                                        -{property.discount}% OFF
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                                                <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-300">
                                                    <FiHeart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                                                </button>
                                                <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-300">
                                                    <FiShare2 className="w-4 h-4 text-gray-600 hover:text-blue-600" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="md:w-3/5 p-6">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {property.title}
                                                </h3>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        ₹{property.price.toLocaleString()}
                                                        <span className="text-sm text-gray-500 font-normal">/night</span>
                                                    </div>
                                                    {property.discount > 0 && (
                                                        <div className="text-sm text-red-500 line-through">
                                                            ₹{property.originalPrice.toLocaleString()}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-gray-600 mb-3">
                                                <FiMapPin className="w-4 h-4" />
                                                <span className="text-sm">{property.location}</span>
                                            </div>

                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {property.description}
                                            </p>

                                            {/* Rating & Reviews */}
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-lg">
                                                    <FiStar className="w-4 h-4 fill-current" />
                                                    <span className="font-semibold">{property.rating}</span>
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    ({property.reviews.toLocaleString()} reviews)
                                                </span>
                                            </div>

                                            {/* Amenities */}
                                            <div className="flex items-center gap-4 mb-6">
                                                {property.amenities.slice(0, 4).map((amenity, index) => {
                                                    const amenityConfig = amenities.find(a => a.id === amenity);
                                                    return amenityConfig ? (
                                                        <div key={index} className="flex items-center gap-1 text-gray-500" title={amenityConfig.label}>
                                                            <amenityConfig.icon className="w-4 h-4" />
                                                        </div>
                                                    ) : null;
                                                })}
                                                {property.amenities.length > 4 && (
                                                    <span className="text-sm text-gray-500">+{property.amenities.length - 4} more</span>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleBookNowClick(property)}
                                                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                                                >
                                                    Book Now
                                                </button>
                                                <button
                                                    onClick={() => handleViewClick(property)}
                                                    className="px-6 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
                                                >
                                                    <FiEye className="w-4 h-4" />
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* No Results State */}
                        {sortedResults.length === 0 && (
                            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
                                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                    Try adjusting your search criteria or filters to find more options
                                </p>
                                <button
                                    onClick={clearAllFilters}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {showModal && selectedProperty && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-900">{selectedProperty.title}</h3>
                                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                                    <FiX className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {selectedProperty.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${selectedProperty.title} - Room ${index + 1}`}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm">{selectedProperty.description}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Styles */}
            <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
}

export default SearchPage;