import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FeaturedCard from "../card/FeaturedCard";
import { apiHandler } from "../../utils/api"; // Adjust the import path to your API file

function Featured() {
  const [featuredData, setFeaturedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Responsive visible cards based on screen size
  const getVisibleCards = () => {
    if (window.innerWidth >= 1280) return 4; // xl: 4 cards
    if (window.innerWidth >= 1024) return 3; // lg: 3 cards
    if (window.innerWidth >= 768) return 2; // md: 2 cards
    return 1; // sm: 1 card
  };
  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  // Update visible cards on window resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch featured data from API
  useEffect(() => {
    const fetchFeaturedData = async () => {
      try {
        setIsLoading(true);
        const response = await apiHandler({
          url: "/customer/feature",
          method: "GET",
          requireAuth: true, // Assuming the endpoint requires authentication
        });

        console.log("API Response:", response); // Log to inspect structure

        // Handle different response structures
        let dataArray = [];
        if (Array.isArray(response)) {
          dataArray = response;
        } else if (response.data && Array.isArray(response.data)) {
          dataArray = response.data;
        } else if (response.features && Array.isArray(response.features)) {
          dataArray = response.features;
        } else {
          throw new Error("API response is not in expected format");
        }

        // Transform API data to match FeaturedCard props
        const transformedData = dataArray.map((item, index) => ({
          image:
            item.image ||
            item.imageUrl ||
            item.photo ||
            `https://images.unsplash.com/photo-1512917774080-9991${index}?w=800`,
          bedrooms: item.bedrooms || item.bedroomCount || 0,
          bathrooms: item.bathrooms || item.bathroomCount || 0,
          title: item.title || item.name || "Unnamed Property",
          location: item.location || item.city || "Unknown Location",
          price: item.price || 0,
          rating: item.rating || 0,
          reviews: item.reviews || item.reviewCount || 0,
          popular: item.popular || false,
        }));

        setFeaturedData(transformedData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching featured data:", err);
        setError(err.message || "Failed to fetch featured listings");
        setIsLoading(false);
        // Fallback to default data
        setFeaturedData(getDefaultFeaturedData());
      }
    };

    fetchFeaturedData();
  }, []);

  // Default data for fallback
  const getDefaultFeaturedData = () => [
    {
      image: "https://images.unsplash.com/photo-1512917774080-9991f01c0886?w=800",
      bedrooms: 2,
      bathrooms: 1,
      title: "Cozy Mountain Cabin",
      location: "Aspen, CO",
      price: 200,
      rating: 4.8,
      reviews: 120,
      popular: true,
    },
    {
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      bedrooms: 3,
      bathrooms: 2,
      title: "Beachfront Villa",
      location: "Malibu, CA",
      price: 350,
      rating: 4.9,
      reviews: 85,
      popular: true,
    },
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      bedrooms: 1,
      bathrooms: 1,
      title: "City Loft",
      location: "New York, NY",
      price: 150,
      rating: 4.5,
      reviews: 200,
      popular: false,
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      bedrooms: 4,
      bathrooms: 3,
      title: "Luxury Countryside Estate",
      location: "Tuscany, Italy",
      price: 500,
      rating: 4.7,
      reviews: 65,
      popular: true,
    },
  ];

  // Handle scroll navigation
  const handleScroll = (direction) => {
    if (isAnimating || featuredData.length <= visibleCards) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => {
      if (direction === "left") {
        return prev === 0 ? featuredData.length - visibleCards : prev - 1;
      }
      return prev >= featuredData.length - visibleCards ? 0 : prev + 1;
    });
  };

  // Update arrow visibility
  const updateArrowVisibility = () => {
    if (scrollRef.current && featuredData.length > visibleCards) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    } else {
      setShowLeftArrow(false);
      setShowRightArrow(featuredData.length > visibleCards);
    }
  };

  useEffect(() => {
    updateArrowVisibility();
    const timer = setTimeout(() => setIsAnimating(false), 700);
    return () => clearTimeout(timer);
  }, [currentIndex, featuredData.length, visibleCards]);

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", updateArrowVisibility);
      return () => ref.removeEventListener("scroll", updateArrowVisibility);
    }
  }, [featuredData.length, visibleCards]);

  // Auto-slide functionality
  useEffect(() => {
    if (featuredData.length <= visibleCards) return;
    const interval = setInterval(() => handleScroll("right"), 5000);
    return () => clearInterval(interval);
  }, [featuredData.length, currentIndex, visibleCards]);

  // Navigation dots
  const getDots = () => {
    if (featuredData.length <= visibleCards) return null;
    const totalSlides = Math.ceil(featuredData.length / visibleCards);
    return Array.from({ length: totalSlides }, (_, i) => (
      <button
        key={i}
        onClick={() => {
          if (!isAnimating) setCurrentIndex(i * visibleCards);
        }}
        className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
          Math.floor(currentIndex / visibleCards) === i
            ? "bg-blue-600 scale-125"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
      />
    ));
  };

  // Scroll to current index
  useEffect(() => {
    if (scrollRef.current && !isAnimating) {
      const scrollAmount = (scrollRef.current.scrollWidth / featuredData.length) * currentIndex;
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentIndex, isAnimating, featuredData.length]);

  // Render loading state
  if (isLoading) {
    return (
      <section className="relative w-full py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-lg text-gray-600 mt-4">Loading featured places...</p>
        </div>
      </section>
    );
  }

  // Render error state
  if (error) {
    return (
      <section className="relative w-full py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Featured Places</h3>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Places to Stay
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover handpicked accommodations that offer exceptional comfort,
            stunning locations, and unforgettable experiences for your next getaway.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => handleScroll("left")}
            disabled={isAnimating || !showLeftArrow}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-4 hover:bg-white hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 border border-white/50 group ${
              !showLeftArrow ? "opacity-50 cursor-not-allowed hidden" : ""
            }`}
          >
            <ChevronLeft
              size={24}
              className={`transition-colors ${
                showLeftArrow ? "text-gray-700 group-hover:text-blue-600" : "text-gray-400"
              }`}
            />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll("right")}
            disabled={isAnimating || !showRightArrow}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl p-4 hover:bg-white hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 border border-white/50 group ${
              !showRightArrow ? "opacity-50 cursor-not-allowed hidden" : ""
            }`}
          >
            <ChevronRight
              size={24}
              className={`transition-colors ${
                showRightArrow ? "text-gray-700 group-hover:text-blue-600" : "text-gray-400"
              }`}
            />
          </button>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-indigo-100 to-transparent z-10 pointer-events-none"></div>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-8 pt-4 px-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {featuredData.length > 0 ? (
              featuredData.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transform transition-all duration-500 hover:scale-105"
                  style={{
                    minWidth: "250px", // Minimum card width
                    opacity:
                      index >= currentIndex && index < currentIndex + visibleCards ? 1 : 0.7,
                  }}
                >
                  <FeaturedCard
                    image={item.image}
                    bedrooms={item.bedrooms}
                    bathrooms={item.bathrooms}
                    title={item.title}
                    location={item.location}
                    price={item.price}
                    rating={item.rating}
                    reviews={item.reviews}
                    popular={item.popular}
                  />
                </div>
              ))
            ) : (
              <div className="flex-shrink-0 w-full text-center">
                <p className="text-gray-600">No featured places available.</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Dots */}
        {featuredData.length > visibleCards && (
          <div className="flex justify-center space-x-3 mt-8">{getDots()}</div>
        )}
      </div>
    </section>
  );
}

export default Featured;