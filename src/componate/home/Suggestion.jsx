import React, { useState, useEffect } from "react";
import { apiHandler } from "../../utils/api"; // Adjust the import path to your api.js file

function SuggestionCard({ image, title, subtitle }) {
  return (
    <div className="w-[300px] bg-[#f8f1e7] p-4 rounded-2xl flex flex-col items-center">
      <div className="w-full h-[350px] overflow-hidden rounded-2xl">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-center">{title}</h3>
      <p className="text-gray-500 text-sm text-center">{subtitle}</p>
    </div>
  );
}

function Suggestion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const visibleCards = 4;
  const cardWidthPercentage = 100 / visibleCards;

  // Define gradients for fallback
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

  // Fetch data from API using apiHandler
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiHandler({
          url: "/customer/city_based",
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
        } else if (response.cities && Array.isArray(response.cities)) {
          dataArray = response.cities;
        } else if (response.results && Array.isArray(response.results)) {
          dataArray = response.results;
        } else {
          throw new Error("API response is not in expected format");
        }

        if (dataArray.length === 0) {
          throw new Error("No data available from API");
        }

        // Transform API data to match card format
        const transformedCards = dataArray.map((item, index) => ({
          image:
            item.image ||
            item.imageUrl ||
            item.img ||
            item.photo ||
            `https://images.unsplash.com/photo-150178588804${index}?w=1000`,
          title: item.title || item.name || item.cityName || item.city || "Unknown City",
          subtitle:
            item.subtitle ||
            (item.propertyCount ? `${item.propertyCount.toLocaleString()} properties` : null) ||
            (item.count ? `${item.count.toLocaleString()} properties` : null) ||
            (item.properties ? `${item.properties.toLocaleString()} properties` : "View properties"),
          gradient: item.gradient || getGradient(index),
        }));

        setCards(transformedCards);
      } catch (err) {
        console.error("Error fetching city data:", err);
        setError(err.message || "Failed to fetch destinations");
        setCards(getDefaultCards()); // Fallback to default data
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, []);

  const getDefaultCards = () => [
    {
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1000",
      title: "Enjoy the great cold",
      subtitle: "50,000 properties",
      gradient: "from-blue-500/20 to-purple-500/20",
    },
    {
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000",
      title: "Sunny Beaches",
      subtitle: "32,000 properties",
      gradient: "from-amber-500/20 to-orange-500/20",
    },
    {
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1000",
      title: "Mountain Escapes",
      subtitle: "18,500 properties",
      gradient: "from-emerald-500/20 to-teal-500/20",
    },
    {
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000",
      title: "City Lights",
      subtitle: "41,200 properties",
      gradient: "from-violet-500/20 to-fuchsia-500/20",
    },
    {
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000",
      title: "Countryside Stay",
      subtitle: "22,800 properties",
      gradient: "from-green-500/20 to-lime-500/20",
    },
    {
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000",
      title: "Nature Retreats",
      subtitle: "15,300 properties",
      gradient: "from-rose-500/20 to-pink-500/20",
    },
  ];

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
            <p className="mt-4 text-gray-600">Loading destinations...</p>
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Destinations</h3>
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
            Discover Your Perfect Getaway
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore handpicked destinations with the perfect properties for your next adventure
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