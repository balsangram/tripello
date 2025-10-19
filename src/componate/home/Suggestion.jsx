import React, { useState, useEffect } from "react";
import SuggestionCard from "../card/SuggestionCard";

function Suggestion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const cards = [
    {
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1000",
      title: "Enjoy the great cold",
      subtitle: "50,000 properties",
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000",
      title: "Sunny Beaches",
      subtitle: "32,000 properties",
      gradient: "from-amber-500/20 to-orange-500/20"
    },
    {
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1000",
      title: "Mountain Escapes",
      subtitle: "18,500 properties",
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000",
      title: "City Lights",
      subtitle: "41,200 properties",
      gradient: "from-violet-500/20 to-fuchsia-500/20"
    },
    {
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000",
      title: "Countryside Stay",
      subtitle: "22,800 properties",
      gradient: "from-green-500/20 to-lime-500/20"
    },
    {
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000",
      title: "Nature Retreats",
      subtitle: "15,300 properties",
      gradient: "from-rose-500/20 to-pink-500/20"
    },
  ];

  const visibleCards = 4;
  const cardWidthPercentage = 100 / visibleCards;

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev >= cards.length - visibleCards ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === 0 ? cards.length - visibleCards : prev - 1
    );
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  // Reset animation state
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 700);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const getDots = () => {
    const totalSlides = Math.ceil(cards.length / visibleCards);
    return Array.from({ length: totalSlides }, (_, i) => (
      <button
        key={i}
        onClick={() => {
          if (!isAnimating) setCurrentIndex(i * visibleCards);
        }}
        className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${Math.floor(currentIndex / visibleCards) === i
          ? "bg-blue-600 scale-125"
          : "bg-gray-300 hover:bg-gray-400"
          }`}
      />
    ));
  };

  const handleExplore = (title) => {
    console.log(`Exploring ${title}`);
  };

  return (
    <div className="relative w-full py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Discover Your Perfect Getaway
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore handpicked destinations with the perfect properties for your next adventure
          </p>
        </div>

        <div className="relative flex items-center justify-center w-full">
          {/* Left Arrow - Positioned on top */}
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="absolute left-4 z-30 bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-5 hover:bg-white hover:scale-110 hover:shadow-xl active:scale-105 transition-all duration-300 border border-white/60 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
            aria-label="Previous suggestions"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <svg
              className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Cards Container - Full Width */}
          <div className="overflow-hidden w-full">
            <div
              className={`flex gap-6 transition-transform duration-700 ease-out ${isAnimating ? 'pointer-events-none' : ''}`}
              style={{
                transform: `translateX(-${currentIndex * cardWidthPercentage}%)`,
              }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="min-w-[25%] flex-shrink-0 flex justify-center transform transition-all duration-500 hover:scale-105 relative group px-2"
                  style={{
                    transform: `scale(${index >= currentIndex && index < currentIndex + visibleCards ? 1 : 0.95})`,
                    opacity: index >= currentIndex && index < currentIndex + visibleCards ? 1 : 0.7,
                  }}
                >
                  <div className="relative w-full max-w-xs">
                    {/* Explore Button - Top Right of Card */}
                    <button
                      onClick={() => handleExplore(card.title)}
                      className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm shadow-lg rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                    >
                      Explore
                    </button>

                    {/* Card with enhanced styling */}
                    <div className="relative w-full">
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10`}></div>
                      <SuggestionCard
                        image={card.image}
                        title={card.title}
                        subtitle={card.subtitle}
                        isFeatured={index === currentIndex + 1}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow - Positioned on top */}
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="absolute right-4 z-30 bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-5 hover:bg-white hover:scale-110 hover:shadow-xl active:scale-105 transition-all duration-300 border border-white/60 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
            aria-label="Next suggestions"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <svg
              className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Enhanced Navigation Dots */}
        <div className="flex justify-center space-x-3 mt-12 px-6">
          {getDots()}
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mt-8 px-6">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
              style={{
                width: `${((currentIndex + visibleCards) / cards.length) * 100}%`
              }}
            ></div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 px-6">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-purple-600 active:scale-95">
            Explore All Destinations
          </button>
        </div>
      </div>
    </div>
  );
}

export default Suggestion;