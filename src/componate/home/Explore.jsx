import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, Share2, MapPin } from "lucide-react";
import ExploreCard from "../card/ExploreCard";
import { apiHandler } from "../../utils/api"; // Adjust the import path if needed

function Explore() {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [stayTypes, setStayTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define gradients and colors for fallback
  const gradients = [
    "from-blue-500/10 to-purple-500/10",
    "from-emerald-500/10 to-teal-500/10",
    "from-amber-500/10 to-orange-500/10",
    "from-green-500/10 to-lime-500/10",
    "from-violet-500/10 to-fuchsia-500/10",
    "from-rose-500/10 to-pink-500/10",
    "from-indigo-500/10 to-blue-500/10",
    "from-slate-500/10 to-gray-500/10",
  ];
  const colors = ["blue", "emerald", "amber", "green", "violet", "rose", "indigo", "slate"];

  // Fetch stay types from API
  useEffect(() => {
    const fetchStayTypes = async () => {
      try {
        setIsLoading(true);
        const response = await apiHandler({
          url: "/customer/stay_types",
          method: "GET",
          requireAuth: true,
        });
        console.log("API Response:", response); // Log to inspect structure
        // Map API data to expected format
        const mappedData = response.data.map((item, index) => ({
          image: item.image_url || item.image || "https://via.placeholder.com/250x160",
          title: item.name || item.title || "Unnamed Stay Type",
          properties: item.property_count || item.properties || 0,
          gradient: item.gradient || gradients[index % gradients.length],
          color: item.color || colors[index % colors.length],
          location: item.location || "Unknown Location",
          rating: item.rating || 0,
        }));
        setStayTypes(mappedData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch stay types");
        setIsLoading(false);
      }
    };

    fetchStayTypes();
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

  const toggleFavorite = (index) => {
    setFavorites((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleShare = (title) => {
    console.log(`Sharing: ${title}`);
  };

  const handleExplore = (title) => {
    console.log(`Exploring: ${title}`);
  };

  // Render loading state
  if (isLoading) {
    return (
      <section className="w-full px-6 lg:px-12 py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="text-lg text-gray-600">Loading stay types...</p>
        </div>
      </section>
    );
  }

  // Render error state
  if (error) {
    return (
      <section className="w-full px-6 lg:px-12 py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-6 lg:px-12 py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Explore by types of stays
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover perfect accommodations from our curated collection of{" "}
            <span className="font-semibold text-blue-600">{stayTypes.length} unique stay types</span>
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
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

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
                  <div className="relative group">
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10`}
                    ></div>

                    {/* Top Left: Number Badge */}
                    {/* <div className="absolute top-4 left-4 z-30">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg border border-white/50">
                        #{index + 1}
                      </span>
                    </div> */}

                    {/* Top Right: Rating Badge */}
                    {/* <div className="absolute top-4 right-4 z-30">
                      <div className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-semibold shadow-lg border border-white/50 flex items-center gap-1">
                        ⭐ {item.rating.toFixed(1)}
                      </div>
                    </div> */}

                    {/* Location Badge */}
                    {/* <div className="absolute top-32 left-4 z-20">
                      <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
                        <MapPin size={12} />
                        {item.location}
                      </div>
                    </div> */}

                    {/* Left Side Button: Favorite (centered vertically) */}
                    {/* <button
                      onClick={() => toggleFavorite(index)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-2 hover:bg-white hover:scale-110 hover:shadow-xl transition-all duration-300 border border-white/50 group"
                    >
                      <Heart
                        size={18}
                        className={`transition-colors ${
                          favorites[index]
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600 group-hover:text-red-500"
                        }`}
                      />
                    </button> */}

                    {/* Right Side Button: Share (centered vertically) */}
                    {/* <button
                      onClick={() => handleShare(item.title)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-2 hover:bg-white hover:scale-110 hover:shadow-xl transition-all duration-300 border border-white/50 group"
                    >
                      <Share2
                        size={18}
                        className="text-gray-600 group-hover:text-blue-600 transition-colors"
                      />
                    </button> */}

                    {/* Explore Button - Bottom Center */}
                    {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-full px-4">
                      <button
                        onClick={() => handleExplore(item.title)}
                        className="w-full bg-white/90 backdrop-blur-sm text-gray-800 py-3 rounded-xl font-semibold shadow-lg hover:bg-white hover:shadow-xl hover:scale-105 transform transition-all duration-300 border border-white/50 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                      >
                        Explore Now
                      </button>
                    </div> */}

                    <ExploreCard
                      image={item.image}
                      title={item.title}
                      properties={item.properties}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-shrink-0 w-full text-center">
                <p className="text-gray-600">No stay types available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Explore;