import React, { useState, useEffect } from "react";
import SuggestionCard from "../card/SuggestionCard"; // Adjust the import path to your SuggestionCard file
import { apiHandler } from "../../utils/api"; // Adjust the import path to your api.js file

function Suggestion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const visibleCards = 4;
  const cardWidthPercentage = 100 / visibleCards;

  // Define gradients for visual enhancement
  const getGradient = (index) => {
    const gradients = [
      "from-blue-500/20 to-purple-500/20",
      "from-amber-500/20 to-orange-500/20",
      "from-emerald-500/20 to-teal-500/20",
      "from-violet-500/20 to-fuchsia-500/20",
      "from-green-500/20 to-lime-500/20",
      "from-rose-500/20 to-pink-500/20",
    ];
    return gradients[index % gradients.length];
  };

  // Static image mapping using only Unsplash URLs
  const getStaticImage = (stayType) => {
    const imageMap = {
      "Standard rooms": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1000", // Default room
      "Suites": "https://images.unsplash.com/photo-1613545325278-bd76f0e345b6?w=1000", // Luxury suite
      "Deluxe rooms": "https://images.unsplash.com/photo-1600585154526-990d71c4e1f7?w=1000", // Deluxe room
      "Villas": "https://images.unsplash.com/photo-1565488469940-2e4e1e8e8b51?w=1000", // Villa
      "Bungalows": "https://images.unsplash.com/photo-1600585154312-c3ff6e41b58e?w=1000", // Bungalow
      "Overwater bungalows": "https://images.unsplash.com/photo-1597476554287-4f90e92e3e4e?w=1000", // Overwater
      "Homestay": "https://images.unsplash.com/photo-1600585154265-7b48e97a8c55?w=1000", // Homestay
      "Cottage": "https://images.unsplash.com/photo-1600585154483-6b8a6d9c7a0f?w=1000", // Cottage
      "Apartment": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1000", // Apartment
      "Farmhouse": "https://images.unsplash.com/photo-1600585154662-7f6d7e3c4a7e?w=1000", // Farmhouse
      "Camp": "https://images.unsplash.com/photo-1600585154734-7e4a2f7b3f8f?w=1000", // Camping
      "Beach hut": "https://images.unsplash.com/photo-1600585154718-9b5e3f8e7b75?w=1000", // Beach hut
    };
    const imageUrl = imageMap[stayType] || "https://via.placeholder.com/300x350";
    console.log(`Image for ${stayType}: ${imageUrl}`); // Debug image URL
    return imageUrl;
  };

  // Fetch data from API using apiHandler
  useEffect(() => {
    const fetchStayTypes = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiHandler({
          url: "/customer/stay_types",
          method: "GET",
          requireAuth: true, // Assuming the endpoint requires authentication
        });

        console.log("API Response:", response); // Log to inspect structure

        // Validate and extract data
        if (response && response.status === "success" && Array.isArray(response.data)) {
          const dataArray = response.data;
          if (dataArray.length === 0) {
            throw new Error("No stay types available from API");
          }

          // Transform API data to match card format
          const transformedCards = dataArray.map((stayType, index) => ({
            image: getStaticImage(stayType),
            title: stayType,
            subtitle: "Explore properties",
            gradient: getGradient(index),
          }));

          setCards(transformedCards);
        } else {
          console.log("Unexpected response structure:", response);
          throw new Error("API response is not in expected format");
        }
      } catch (err) {
        console.error("Error fetching stay types:", err);
        setError(err.message || "Failed to fetch stay types");
        setCards([]); // No fallback data, just empty state
      } finally {
        setLoading(false);
      }
    };

    fetchStayTypes();
  }, []);

  const handleNext = () => {
    if (isAnimating || cards.length <= visibleCards) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev >= cards.length - visibleCards ? 0 : prev + 1));
  };

  const handlePrev = () => {
    if (isAnimating || cards.length <= visibleCards) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? cards.length - visibleCards : prev - 1));
  };

  useEffect(() => {
    if (cards.length <= visibleCards) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [cards.length, currentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 700);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const getDots = () => {
    if (cards.length <= visibleCards) return null;
    const totalSlides = Math.ceil(cards.length / visibleCards);
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

  const handleExplore = (title) => {
    console.log(`Exploring ${title}`);
  };

  // Loading State
  if (loading) {
    return (
      <div className="relative w-full py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading stay types...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="relative w-full py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
        <div className="flex justify-center items-center h-96">
          <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Stay Types</h3>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full relative z-10">
        <div className="text-center mb-12 px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Discover Your Perfect Stay Type
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore handpicked stay types with the perfect properties for your next adventure
          </p>
        </div>

        <div className="relative flex items-center justify-center w-full">
          <button
            onClick={handlePrev}
            disabled={isAnimating || cards.length <= visibleCards}
            className="absolute left-4 z-30 bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-5 hover:bg-white hover:scale-110 hover:shadow-xl active:scale-105 transition-all duration-300 border border-white/60 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
            aria-label="Previous suggestions"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            <svg
              className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="overflow-hidden w-full">
            <div
              className={`flex gap-6 transition-transform duration-700 ease-out ${
                isAnimating ? "pointer-events-none" : ""
              }`}
              style={{
                transform: `translateX(-${currentIndex * cardWidthPercentage}%)`,
              }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="min-w-[25%] flex-shrink-0 flex justify-center transform transition-all duration-500 hover:scale-105 relative group px-2"
                  style={{
                    transform: `scale(${
                      index >= currentIndex && index < currentIndex + visibleCards ? 1 : 0.95
                    })`,
                    opacity: index >= currentIndex && index < currentIndex + visibleCards ? 1 : 0.7,
                  }}
                >
                  <div className="relative w-full max-w-xs">
                    <button
                      onClick={() => handleExplore(card.title)}
                      className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm shadow-lg rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                    >
                      Explore
                    </button>

                    <div className="relative w-full">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10`}
                      ></div>
                      <SuggestionCard image={card.image} title={card.title} subtitle={card.subtitle} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={isAnimating || cards.length <= visibleCards}
            className="absolute right-4 z-30 bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-5 hover:bg-white hover:scale-110 hover:shadow-xl active:scale-105 transition-all duration-300 border border-white/60 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
            aria-label="Next suggestions"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            <svg
              className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {cards.length > visibleCards && (
          <div className="flex justify-center space-x-3 mt-12 px-6">{getDots()}</div>
        )}
      </div>
    </div>
  );
}

export default Suggestion;