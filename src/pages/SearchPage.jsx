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
    FiList,
    FiChevronLeft,
    FiChevronRight
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

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [totalItems, setTotalItems] = useState(0);

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

    // Sample search results data - expanded for pagination demo
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
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1578683015141-738c7604b2fd?w=400&h=400&fit=crop"
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
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"
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
                "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop"
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
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1571003119718-97518273d7c0?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1564507592333-cdd2ae446de7?w=400&h=400&fit=crop"
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
                "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1551524161-1205e895bace?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1578683015141-738c7604b2fd?w=400&h=400&fit=crop"
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
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"
            ],
            amenities: ["wifi", "pool", "gym", "ac", "parking"],
            type: "penthouse",
            discount: 14,
            isFeatured: true
        },
        {
            id: 7,
            title: "Seaside Villa",
            description: "Private villa with direct beach access and infinity pool",
            location: "Andaman Islands",
            price: 18500,
            originalPrice: 21000,
            rating: 4.9,
            reviews: 156,
            images: [
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=400&fit=crop"
            ],
            amenities: ["wifi", "pool", "spa", "restaurant", "ac", "parking"],
            type: "villa",
            discount: 12,
            isFeatured: true
        },
        {
            id: 8,
            title: "Hilltop Retreat",
            description: "Serene retreat with valley views and organic farm",
            location: "Coorg, Karnataka",
            price: 7500,
            originalPrice: 8500,
            rating: 4.5,
            reviews: 342,
            images: [
                "https://images.unsplash.com/photo-1564507592333-cdd2ae446de7?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop"
            ],
            amenities: ["wifi", "parking", "restaurant"],
            type: "retreat",
            discount: 12,
            isFeatured: false
        },
        {
            id: 9,
            title: "Business Hotel Premium",
            description: "Luxury business hotel with conference facilities",
            location: "Delhi, NCR",
            price: 8900,
            originalPrice: 9900,
            rating: 4.4,
            reviews: 876,
            images: [
                "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop"
            ],
            amenities: ["wifi", "gym", "restaurant", "ac", "parking", "spa"],
            type: "hotel",
            discount: 10,
            isFeatured: true
        },
        {
            id: 10,
            title: "Desert Camp Experience",
            description: "Luxury desert camp with cultural activities",
            location: "Jaisalmer, Rajasthan",
            price: 5500,
            originalPrice: 6500,
            rating: 4.7,
            reviews: 423,
            images: [
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1571003119718-97518273d7c0?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1564507592333-cdd2ae446de7?w=400&h=400&fit=crop"
            ],
            amenities: ["wifi", "restaurant"],
            type: "camp",
            discount: 15,
            isFeatured: false
        },
        {
            id: 11,
            title: "Lakeview Resort",
            description: "Peaceful resort overlooking pristine lake",
            location: "Nainital, Uttarakhand",
            price: 6800,
            originalPrice: 7800,
            rating: 4.6,
            reviews: 298,
            images: [
                "https://images.unsplash.com/photo-1578683015141-738c7604b2fd?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop"
            ],
            amenities: ["wifi", "pool", "restaurant", "ac", "parking"],
            type: "resort",
            discount: 13,
            isFeatured: true
        },
        {
            id: 12,
            title: "Budget Friendly Hostel",
            description: "Comfortable and affordable hostel for backpackers",
            location: "Goa, North Goa",
            price: 1200,
            originalPrice: 1500,
            rating: 4.2,
            reviews: 567,
            images: [
                "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop",
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop"
            ],
            amenities: ["wifi", "parking"],
            type: "hostel",
            discount: 20,
            isFeatured: false
        }
    ];

    // Simulate backend data fetch
    useEffect(() => {
        // In real app, this would be an API call
        setTotalItems(searchResults.length);
    }, []);

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
        setCurrentPage(1);
    };

    const handleViewClick = (property) => {
        setSelectedProperty(property);
        setShowModal(true);
    };

    const handleBookNowClick = (property) => {
        window.location.href = `room-detail?id=${property.id}`;
    };

    // Filter and sort results
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

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedResults.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedResults.length / itemsPerPage);

    // Pagination controls
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
            {/* Search Header */}
            <div className="bg-white shadow-lg border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4"> {/* Reduced padding */}
                    {/* Search Tabs */}
                    <div className="flex overflow-x-auto scrollbar-hide border-b">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap transition-all duration-300 border-b-2 ${activeTab === tab.id
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
                    <div className="p-4"> {/* Reduced padding */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                                {/* Location */}
                                <div className="relative group">
                                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500" />
                                    <input
                                        type="text"
                                        placeholder="Where are you going?"
                                        value={searchData.location}
                                        onChange={(e) => handleSearchChange("location", e.target.value)}
                                        className="w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>

                                {/* Check-in */}
                                <div className="relative group">
                                    <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500" />
                                    <input
                                        type="text"
                                        placeholder="Check-in date"
                                        value={searchData.checkIn}
                                        onChange={(e) => handleSearchChange("checkIn", e.target.value)}
                                        className="w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all duration-300"
                                    />
                                </div>

                                {/* Check-out */}
                                <div className="relative group">
                                    <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500" />
                                    <input
                                        type="text"
                                        placeholder="Check-out date"
                                        value={searchData.checkOut}
                                        onChange={(e) => handleSearchChange("checkOut", e.target.value)}
                                        className="w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all duration-300"
                                    />
                                </div>

                                {/* Guests & Search Button */}
                                <div className="flex gap-2">
                                    <div className="relative group flex-1">
                                        <FiUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500" />
                                        <select
                                            value={searchData.guests}
                                            onChange={(e) => handleSearchChange("guests", e.target.value)}
                                            className="w-full pl-10 pr-8 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer transition-all duration-300"
                                        >
                                            <option>1 Adult</option>
                                            <option>2 Adults</option>
                                            <option>2 Adults, 1 Child</option>
                                            <option>2 Adults, 2 Children</option>
                                            <option>Family (4+)</option>
                                        </select>
                                        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3" />
                                    </div>

                                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 min-w-[100px] justify-center text-sm">
                                        <FiSearch className="w-4 h-4" />
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Popular Destinations */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            <span className="text-gray-600 font-medium text-sm">Popular:</span>
                            {popularDestinations.map((destination) => (
                                <button
                                    key={destination}
                                    onClick={() => handleSearchChange("location", destination)}
                                    className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-all duration-300 text-xs font-medium"
                                >
                                    {destination}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 py-6"> {/* Reduced padding */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filters Sidebar */}
                    <div className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sticky top-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900 text-base">Filters</h3>
                                <button
                                    onClick={clearAllFilters}
                                    className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                                >
                                    Clear all
                                </button>
                            </div>

                            {/* Price Range */}
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Price Range</h4>
                                <div className="space-y-3">
                                    <input
                                        type="range"
                                        min="500"
                                        max="30000"
                                        step="500"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                    />
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <span>₹{priceRange[0].toLocaleString()}</span>
                                        <span>₹{priceRange[1].toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Amenities</h4>
                                <div className="space-y-2">
                                    {amenities.map((amenity) => (
                                        <label key={amenity.id} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedAmenities.includes(amenity.id)}
                                                onChange={() => toggleAmenity(amenity.id)}
                                                className="w-3.5 h-3.5 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                            <amenity.icon className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-xs">
                                                {amenity.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Property Type */}
                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Property Type</h4>
                                <div className="space-y-1.5">
                                    {["Hotel", "Resort", "Villa", "Apartment", "Hostel", "Cottage"].map((type) => (
                                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="w-3.5 h-3.5 text-blue-600 rounded focus:ring-blue-500" />
                                            <span className="text-gray-700 text-xs">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 mb-1">
                                        {sortedResults.length} Properties Found
                                    </h2>
                                    <p className="text-gray-600 flex items-center gap-1.5 text-sm">
                                        <FiMapPin className="w-3.5 h-3.5" />
                                        {searchData.location || "Popular destinations"} •
                                        {searchData.checkIn && searchData.checkOut && ` ${searchData.checkIn} - ${searchData.checkOut}`}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* View Toggle */}
                                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                        <button
                                            onClick={() => setViewMode("grid")}
                                            className={`p-1.5 rounded-md transition-all ${viewMode === "grid"
                                                ? "bg-white text-blue-600 shadow-sm"
                                                : "text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            <FiGrid className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode("list")}
                                            className={`p-1.5 rounded-md transition-all ${viewMode === "list"
                                                ? "bg-white text-blue-600 shadow-sm"
                                                : "text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            <FiList className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Sort */}
                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer text-xs"
                                        >
                                            {sortOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3" />
                                    </div>

                                    {/* Mobile Filter Toggle */}
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors text-xs"
                                    >
                                        <FiFilter className="w-3.5 h-3.5" />
                                        Filters
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results Grid - 6 cards */}
                        <div className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6" // Changed to 3 columns for 6 cards
                                : "space-y-4 mb-6"
                        }>
                            {currentItems.map((property) => (
                                <div
                                    key={property.id}
                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:border-blue-200"
                                >
                                    <div className="flex flex-col">
                                        {/* Image Section - Square */}
                                        <div className="relative aspect-square">
                                            <img
                                                src={property.images[0]}
                                                alt={property.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />

                                            {/* Image Overlay Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            {/* Badges */}
                                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                                                {property.isFeatured && (
                                                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                                                        ⭐ Featured
                                                    </span>
                                                )}
                                                {property.discount > 0 && (
                                                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
                                                        -{property.discount}%
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="absolute top-2 right-2 flex flex-col gap-1">
                                                <button className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:scale-110 hover:bg-white transition-all duration-200 group/heart">
                                                    <FiHeart className="w-3 h-3 text-gray-600 group-hover/heart:text-red-500 transition-colors" />
                                                </button>
                                                <button className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:scale-110 hover:bg-white transition-all duration-200 group/share">
                                                    <FiShare2 className="w-3 h-3 text-gray-600 group-hover/share:text-blue-600 transition-colors" />
                                                </button>
                                            </div>

                                            {/* Property Type Badge */}
                                            <div className="absolute bottom-2 left-2">
                                                <span className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                                    {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-3">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 flex-1 mr-2">
                                                    {property.title}
                                                </h3>
                                                <div className="text-right flex-shrink-0">
                                                    <div className="text-base font-bold text-gray-900">
                                                        ₹{property.price.toLocaleString()}
                                                    </div>
                                                    {property.discount > 0 && (
                                                        <div className="text-xs text-red-500 line-through">
                                                            ₹{property.originalPrice.toLocaleString()}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 text-gray-600 mb-2">
                                                <FiMapPin className="w-3 h-3 flex-shrink-0" />
                                                <span className="text-xs line-clamp-1">{property.location}</span>
                                            </div>

                                            <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">
                                                {property.description}
                                            </p>

                                            {/* Rating & Reviews */}
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">
                                                        <FiStar className="w-3 h-3 fill-current" />
                                                        <span className="font-semibold">{property.rating}</span>
                                                    </div>
                                                    <span className="text-xs text-gray-500">
                                                        ({property.reviews.toLocaleString()})
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Amenities */}
                                            <div className="flex items-center gap-2 mb-3">
                                                {property.amenities.slice(0, 3).map((amenity, index) => {
                                                    const amenityConfig = amenities.find(a => a.id === amenity);
                                                    return amenityConfig ? (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors group/amenity"
                                                            title={amenityConfig.label}
                                                        >
                                                            <amenityConfig.icon className="w-3 h-3 group-hover/amenity:scale-110 transition-transform" />
                                                        </div>
                                                    ) : null;
                                                })}
                                                {property.amenities.length > 3 && (
                                                    <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                                        +{property.amenities.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleBookNowClick(property)}
                                                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-semibold hover:shadow-md transform hover:scale-105 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 text-xs"
                                                >
                                                    Book Now
                                                </button>
                                                <button
                                                    onClick={() => handleViewClick(property)}
                                                    className="px-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center gap-1 text-gray-700 hover:text-gray-900 text-xs"
                                                >
                                                    <FiEye className="w-3 h-3" />
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {sortedResults.length > 0 && (
                            <div className="flex items-center justify-between bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                                <div className="text-sm text-gray-600">
                                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedResults.length)} of {sortedResults.length} properties
                                </div>

                                <div className="flex items-center gap-1">
                                    {/* Previous Button */}
                                    <button
                                        onClick={prevPage}
                                        disabled={currentPage === 1}
                                        className={`p-2 rounded-lg border transition-all duration-200 ${currentPage === 1
                                                ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                                                : 'text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                            }`}
                                    >
                                        <FiChevronLeft className="w-4 h-4" />
                                    </button>

                                    {/* Page Numbers */}
                                    {getPageNumbers().map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => paginate(page)}
                                            className={`min-w-[32px] h-8 rounded-lg border text-sm font-medium transition-all duration-200 ${currentPage === page
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    {/* Next Button */}
                                    <button
                                        onClick={nextPage}
                                        disabled={currentPage === totalPages}
                                        className={`p-2 rounded-lg border transition-all duration-200 ${currentPage === totalPages
                                                ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                                                : 'text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                            }`}
                                    >
                                        <FiChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* No Results State */}
                        {sortedResults.length === 0 && (
                            <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-100">
                                <div className="text-gray-400 text-5xl mb-3">🔍</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
                                <p className="text-gray-600 mb-4 max-w-md mx-auto text-sm">
                                    Try adjusting your search criteria or filters to find more options
                                </p>
                                <button
                                    onClick={clearAllFilters}
                                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
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
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-bold text-gray-900">{selectedProperty.title}</h3>
                                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                {selectedProperty.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${selectedProperty.title} - Room ${index + 1}`}
                                        className="w-full h-48 object-cover rounded-lg"
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
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
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