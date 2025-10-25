import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ExploreCard from "../card/ExploreCard";
import { apiHandler } from "../../utils/api"; // Adjust the import path if needed

function Explore() {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [stayTypes, setStayTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch city-based data from API
  useEffect(() => {
    const fetchCityBasedData = async () => {
      try {
        setIsLoading(true);
        const response = await apiHandler({
          url: "/customer/city_based",
          method: "GET",
          requireAuth: true,
        });
        console.log("API Response:", response); // Log to inspect structure
        // Validate and extract data
        if (response && response.status === "success" && Array.isArray(response.data)) {
          const dataArray = response.data;
          const transformedData = dataArray.map((item, index) => ({
            image: item.images && item.images.length > 0
              ? item.images[0].url
              : `https://via.placeholder.com/250x160`, // Fallback image
            title: item.title || "Unnamed City",
            properties: item.price || 0, // Using price as a proxy for properties
          }));
          setStayTypes(transformedData);
        } else {
          console.log("Unexpected response structure:", response);
          throw new Error("API response is not in expected format");
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching city-based data:", err);
        setError(err.message || "Failed to fetch city-based data");
        setIsLoading(false);
      }
    };

    fetchCityBasedData();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 400;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const { current } = scrollRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <section className="w-full px-6 lg:px-12 py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="text-lg text-gray-600">Loading city-based stays...</p>
        </div>
      </section>
    );
  }

  // Render error state
  if (error) {
    return (
      <section className="w-full px-6 lg:px-12 py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-6 lg:px-12 py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Explore by City
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover perfect accommodations from our curated collection of{" "}
            <span className="font-semibold text-blue-600">{stayTypes.length} unique cities</span>
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-4 hover:bg-white hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 border border-white/50 group ${
              !showLeftArrow ? "opacity-50 cursor-not-allowed hidden" : ""
            }`}
            disabled={!showLeftArrow}
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
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-4 hover:bg-white hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 border border-white/50 group ${
              !showRightArrow ? "opacity-50 cursor-not-allowed hidden" : ""
            }`}
            disabled={!showRightArrow}
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
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-8 pt-4 px-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {stayTypes.length > 0 ? (
              stayTypes.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 transform transition-all duration-500 hover:scale-105"
                >
                  <ExploreCard
                    image={item.image}
                    title={item.title}
                    properties={item.properties}
                  />
                </div>
              ))
            ) : (
              <div className="flex-shrink-0 w-full text-center">
                <p className="text-gray-600">No city-based stays available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Explore;