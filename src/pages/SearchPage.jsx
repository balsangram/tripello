import React, { useState, useEffect } from "react";
import {
    FiSearch,
    FiMapPin,
    FiChevronDown,
    FiStar,
    FiHeart,
    FiShare2,
    FiChevronLeft,
    FiChevronRight,
    FiFilter
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
import { apiHandler } from "../utils/api"; // Adjust the import path to your api.js file

function SearchPage() {
    const [searchData, setSearchData] = useState({
        location: "",
        stayType: "All Types"
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filter States
    const [sortBy, setSortBy] = useState("recommended");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const stayTypes = [
        "All Types",
        "Standard rooms",
        "Suites",
        "Deluxe rooms",
        "Villas",
        "Bungalows",
        "Overwater bungalows",
        "Homestay",
        "Cottage",
        "Apartment",
        "Farmhouse",
        "Camp",
        "Beach hut"
    ];

    const sortOptions = [
        { value: "recommended", label: "Recommended" },
        { value: "price-low", label: "Price: Low to High" },
        { value: "price-high", label: "Price: High to Low" },
        { value: "rating", label: "Highest Rated" }
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

    // Amenities mapping from API to UI IDs
    const amenitiesMap = {
        "WiFi": "wifi",
        "Paid parking on premises": "parking",
        "Kitchen": "restaurant",
        "Washing machine": null,
        "Dedicated workspace": null,
        "Patio": null,
        "Outdoor dining area": null,
        "Pool table": null
    };

    // Map stayType to property type
    const stayTypeMap = {
        "Standard rooms": "hotel",
        "Suites": "suite",
        "Deluxe rooms": "deluxe",
        "Villas": "villa",
        "Bungalows": "bungalow",
        "Overwater bungalows": "overwater",
        "Homestay": "homestay",
        "Cottage": "cottage",
        "Apartment": "apartment",
        "Farmhouse": "farmhouse",
        "Camp": "camp",
        "Beach hut": "beacchut"
    };

    // Fetch search results from API
    const fetchSearchResults = async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            console.log("Fetching search results with params:", params);

            const response = await apiHandler({
                url: "/customer/search_result",
                method: "GET",
                params,
                requireAuth: false
            });

            console.log("API Response:", response);

            // Extract data array
            let dataArray = [];
            if (response.data && Array.isArray(response.data)) {
                dataArray = response.data;
            } else {
                throw new Error("API response is not in expected format");
            }

            if (dataArray.length === 0) {
                setResults([]);
                setLoading(false);
                return;
            }

            // Transform API data to match searchResults structure
            const transformedResults = dataArray.map(item => ({
                id: item._id,
                title: item.title || "Unnamed Property",
                description: item.stay_information || "No description available",
                location: `${item.city_name}, ${item.state_name}`,
                price: item.price || 1000,
                originalPrice: item.price || 1000,
                rating: item.average_rating || 4.0,
                reviews: item.total_reviews || 0,
                images: item.images && item.images.length > 0
                    ? item.images.map(img => img.url)
                    : [
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop",
                        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=400&fit=crop",
                        "https://images.unsplash.com/photo-1578683015141-738c7604b2fd?w=400&h=400&fit=crop"
                    ],
                amenities: [...(item.amenities || []), ...(item.standoutAmenities || [])]
                    .map(a => amenitiesMap[a] || null)
                    .filter(a => a !== null),
                type: stayTypeMap[item.stayType] || "hotel",
                discount: 0,
                isFeatured: item.featured || false
            }));

            setResults(transformedResults);
            setLoading(false);
        } catch (err) {
            console.error("API Error:", err.message, err.response?.data || err);
            setError(err.message || "Failed to fetch search results");
            setResults([]);
            setLoading(false);
        }
    };

    // Trigger search on button click
    const handleSearch = () => {
        console.log("Search button clicked with data:", searchData);
        setCurrentPage(1); // Reset to first page on new search

        const locationParts = searchData.location.split(",").map(part => part.trim()).filter(part => part);
        const city_name = locationParts[0] || "";
        const state_name = locationParts[1] || "";

        const params = {};
        if (city_name) params.city_name = city_name;
        if (state_name) params.state_name = state_name;
        if (searchData.stayType && searchData.stayType !== "All Types") params.stayType = searchData.stayType;

        fetchSearchResults(params);
    };

    const handleSearchChange = (field, value) => {
        setSearchData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAmenityChange = (amenityId) => {
        setSelectedAmenities(prev =>
            prev.includes(amenityId)
                ? prev.filter(id => id !== amenityId)
                : [...prev, amenityId]
        );
    };

    const clearFilters = () => {
        setSortBy("recommended");
        setMinPrice(0);
        setMaxPrice(100000);
        setSelectedAmenities([]);
        setCurrentPage(1);
    };

    const handleBookNowClick = (property) => {
        window.location.href = `room-detail?id=${property.id}`;
    };

    // Filter and sort results
    const filteredResults = results.filter(result =>
        result.price >= minPrice &&
        result.price <= maxPrice &&
        (selectedAmenities.length === 0 ||
            selectedAmenities.every(amenity => result.amenities.includes(amenity)))
    );

    const sortedResults = [...filteredResults].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedResults.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedResults.length / itemsPerPage);

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

    // Reset fields on component mount
    useEffect(() => {
        // Initial fetch with empty params to display all
        fetchSearchResults({});
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
                {/* Simplified Search Header */}
                <div className="bg-white shadow-lg border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="p-6">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    {/* Location */}
                                    <div className="relative group">
                                        <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500" />
                                        <input
                                            type="text"
                                            placeholder="City, State (e.g., Bengaluru, Karnataka)"
                                            value={searchData.location}
                                            onChange={(e) => handleSearchChange("location", e.target.value)}
                                            className="w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        />
                                    </div>

                                    {/* Stay Type Dropdown */}
                                    <div className="relative group">
                                        <select
                                            value={searchData.stayType}
                                            onChange={(e) => handleSearchChange("stayType", e.target.value)}
                                            className="w-full pl-3 pr-8 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer transition-all duration-300"
                                        >
                                            {stayTypes.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-3 h-3" />
                                    </div>

                                    {/* Search Button */}
                                    <button
                                        onClick={handleSearch}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                                    >
                                        <FiSearch className="w-4 h-4" />
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {loading ? (
                        <div className="flex justify-center items-center h-96">
                            <div className="text-center">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                                <p className="mt-4 text-gray-600">Loading search results...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-100">
                            <svg
                                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Results</h3>
                            <p className="text-gray-600 mb-4 max-w-md mx-auto">{error}</p>
                            <button
                                onClick={() => fetchSearchResults({})}
                                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Filters Sidebar - Left Side */}
                            <div className="lg:w-80 flex-shrink-0">
                                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-6">
                                    {/* Filters Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <FiFilter className="w-5 h-5" />
                                            Filters
                                        </h3>
                                        <button
                                            onClick={clearFilters}
                                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                        >
                                            Clear All
                                        </button>
                                    </div>

                                    {/* Sort By */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Sort By</h4>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            {sortOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Price Range */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <label className="text-sm text-gray-600 min-w-12">Min:</label>
                                                <input
                                                    type="number"
                                                    value={minPrice}
                                                    onChange={(e) => setMinPrice(parseInt(e.target.value) || 0)}
                                                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    min="0"
                                                    placeholder="0"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <label className="text-sm text-gray-600 min-w-12">Max:</label>
                                                <input
                                                    type="number"
                                                    value={maxPrice}
                                                    onChange={(e) => setMaxPrice(parseInt(e.target.value) || 100000)}
                                                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    min="0"
                                                    placeholder="100000"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Amenities */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Amenities</h4>
                                        <div className="space-y-2">
                                            {amenities.map((amenity) => (
                                                <label
                                                    key={amenity.id}
                                                    className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedAmenities.includes(amenity.id)}
                                                        onChange={() => handleAmenityChange(amenity.id)}
                                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                                                    />
                                                    <amenity.icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                                        {amenity.label}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Results Section - Right Side */}
                            <div className="flex-1">
                                <div className="space-y-6">
                                    {/* Results Header */}
                                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {sortedResults.length} Properties Found
                                        </h2>
                                        <p className="text-gray-600 flex items-center gap-1.5 text-sm mt-1">
                                            <FiMapPin className="w-3.5 h-3.5" />
                                            {searchData.location ? searchData.location.split(",")[0].trim() || "All locations" : "All locations"} • {searchData.stayType} • ₹{minPrice.toLocaleString()} - ₹{maxPrice.toLocaleString()}
                                        </p>
                                    </div>

                                    {/* Results Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                                        {currentItems.map((property) => (
                                            <div
                                                key={property.id}
                                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:border-blue-200"
                                            >
                                                <div className="flex flex-col h-full">
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
                                                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                                                            {property.isFeatured && (
                                                                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
                                                                    ⭐ Featured
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                                                            <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:scale-110 hover:bg-white transition-all duration-200 group/heart">
                                                                <FiHeart className="w-4 h-4 text-gray-600 group-hover/heart:text-red-500 transition-colors" />
                                                            </button>
                                                            <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:scale-110 hover:bg-white transition-all duration-200 group/share">
                                                                <FiShare2 className="w-4 h-4 text-gray-600 group-hover/share:text-blue-600 transition-colors" />
                                                            </button>
                                                        </div>

                                                        {/* Property Type Badge */}
                                                        <div className="absolute bottom-3 left-3">
                                                            <span className="bg-black/70 text-white px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                                                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Content Section */}
                                                    <div className="p-4 flex flex-col flex-1 justify-between">
                                                        <div>
                                                            <div className="flex items-start justify-between mb-2">
                                                                <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 flex-1 mr-2">
                                                                    {property.title}
                                                                </h3>
                                                                <div className="text-right flex-shrink-0">
                                                                    <div className="text-lg font-bold text-gray-900">
                                                                        ₹{property.price.toLocaleString()}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-1 text-gray-600 mb-3">
                                                                <FiMapPin className="w-3 h-3 flex-shrink-0" />
                                                                <span className="text-sm line-clamp-1">{property.location}</span>
                                                            </div>

                                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                                                                {property.description}
                                                            </p>

                                                            {/* Rating & Reviews */}
                                                            <div className="flex items-center gap-1.5 mb-4">
                                                                <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2.5 py-1 rounded-md text-sm">
                                                                    <FiStar className="w-3 h-3 fill-current" />
                                                                    <span className="font-semibold">{property.rating}</span>
                                                                </div>
                                                                <span className="text-sm text-gray-500">
                                                                    ({property.reviews.toLocaleString()})
                                                                </span>
                                                            </div>

                                                            {/* Amenities - Simplified */}
                                                            <div className="flex items-center gap-2 mb-4">
                                                                {property.amenities.slice(0, 3).map((amenity, index) => {
                                                                    const amenityConfig = amenities.find(a => a.id === amenity);
                                                                    return amenityConfig ? (
                                                                        <div
                                                                            key={index}
                                                                            className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors group/amenity"
                                                                            title={amenityConfig.label}
                                                                        >
                                                                            <amenityConfig.icon className="w-3.5 h-3.5 group-hover/amenity:scale-110 transition-transform" />
                                                                        </div>
                                                                    ) : null;
                                                                })}
                                                                {property.amenities.length > 3 && (
                                                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                                        +{property.amenities.length - 3}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Action Button */}
                                                        <button
                                                            onClick={() => handleBookNowClick(property)}
                                                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg font-semibold hover:shadow-md transform hover:scale-105 transition-all duration-200 hover:from-blue-700 hover:to-blue-800 text-sm"
                                                        >
                                                            Book Now
                                                        </button>
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
                                    {sortedResults.length === 0 && !loading && !error && (
                                        <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-100">
                                            <div className="text-gray-400 text-5xl mb-3">🔍</div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
                                            <p className="text-gray-600 mb-4 max-w-md mx-auto text-sm">
                                                Try adjusting your search criteria or filters
                                            </p>
                                            <button
                                                onClick={() => fetchSearchResults({})}
                                                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                                            >
                                                Show All
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Custom Styles */}
                <style jsx>{`
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
                `}</style>
            </div>
        </div>
    );
}

export default SearchPage;