import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Share2, MapPin } from "lucide-react";
import ExploreCard from "../card/ExploreCard";

function Explore() {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [favorites, setFavorites] = useState({});

  const data = [
    {
      image: "https://images.unsplash.com/photo-1605080404100-7b97f0193aaa?q=80&w=1000",
      title: "Standard Rooms",
      properties: 17288,
      gradient: "from-blue-500/10 to-purple-500/10",
      color: "blue",
      location: "Worldwide",
      rating: 4.2
    },
    {
      image: "https://images.unsplash.com/photo-1560448070-6c7c5ef03e43?q=80&w=1000",
      title: "Deluxe Rooms",
      properties: 8900,
      gradient: "from-emerald-500/10 to-teal-500/10",
      color: "emerald",
      location: "Major Cities",
      rating: 4.5
    },
    {
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000",
      title: "Beach Hut",
      properties: 36612,
      gradient: "from-amber-500/10 to-orange-500/10",
      color: "amber",
      location: "Coastal Areas",
      rating: 4.7
    },
    {
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000",
      title: "Farm House",
      properties: 18188,
      gradient: "from-green-500/10 to-lime-500/10",
      color: "green",
      location: "Countryside",
      rating: 4.4
    },
    {
      image: "https://images.unsplash.com/photo-1582582494700-5b4a1ae0d9e0?q=80&w=1000",
      title: "Dome House",
      properties: 22288,
      gradient: "from-violet-500/10 to-fuchsia-500/10",
      color: "violet",
      location: "Unique Locations",
      rating: 4.8
    },
    {
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000",
      title: "Luxury Villa",
      properties: 15432,
      gradient: "from-rose-500/10 to-pink-500/10",
      color: "rose",
      location: "Premium Destinations",
      rating: 4.9
    },
    {
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1000",
      title: "Mountain Cabin",
      properties: 12876,
      gradient: "from-indigo-500/10 to-blue-500/10",
      color: "indigo",
      location: "Mountain Regions",
      rating: 4.6
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-9635eaca2c28?q=80&w=1000",
      title: "Modern Apartment",
      properties: 29845,
      gradient: "from-slate-500/10 to-gray-500/10",
      color: "slate",
      location: "Urban Centers",
      rating: 4.3
    },
    {
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000",
      title: "Tree House",
      properties: 8765,
      gradient: "from-emerald-500/10 to-green-500/10",
      color: "emerald",
      location: "Forest Areas",
      rating: 4.7
    },
    {
      image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=1000",
      title: "Penthouse",
      properties: 5432,
      gradient: "from-purple-500/10 to-pink-500/10",
      color: "purple",
      location: "City Centers",
      rating: 4.9
    }
  ];

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
    setFavorites(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleShare = (title) => {
    // Simulate share functionality
    console.log(`Sharing: ${title}`);
    // In real app, this would open native share dialog
  };

  const handleExplore = (title) => {
    console.log(`Exploring: ${title}`);
  };

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
            <span className="font-semibold text-blue-600">10 unique stay types</span>
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-4 hover:bg-white hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 border border-white/50 group ${!showLeftArrow ? "opacity-50 cursor-not-allowed hidden" : ""
              }`}
            disabled={!showLeftArrow}
          >
            <ChevronLeft
              size={24}
              className={`transition-colors ${showLeftArrow ? "text-gray-700 group-hover:text-blue-600" : "text-gray-400"
                }`}
            />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-4 hover:bg-white hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 border border-white/50 group ${!showRightArrow ? "opacity-50 cursor-not-allowed hidden" : ""
              }`}
            disabled={!showRightArrow}
          >
            <ChevronRight
              size={24}
              className={`transition-colors ${showRightArrow ? "text-gray-700 group-hover:text-blue-600" : "text-gray-400"
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
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {data.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 transform transition-all duration-500 hover:scale-105"
              >
                <div className="relative group">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10`}></div>

                  {/* Top Left: Number Badge */}
                  <div className="absolute top-4 left-4 z-30">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg border border-white/50">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Top Right: Rating Badge */}
                  <div className="absolute top-4 right-4 z-30">
                    <div className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-semibold shadow-lg border border-white/50 flex items-center gap-1">
                      ⭐ {item.rating}
                    </div>
                  </div>

                  {/* Location Badge */}
                  <div className="absolute top-32 left-4 z-20">
                    <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
                      <MapPin size={12} />
                      {item.location}
                    </div>
                  </div>

                  {/* Left Side Button: Favorite (centered vertically) */}
                  <button
                    onClick={() => toggleFavorite(index)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-2 hover:bg-white hover:scale-110 hover:shadow-xl transition-all duration-300 border border-white/50 group"
                  >
                    <Heart
                      size={18}
                      className={`transition-colors ${favorites[index]
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600 group-hover:text-red-500"
                        }`}
                    />
                  </button>

                  {/* Right Side Button: Share (centered vertically) */}
                  <button
                    onClick={() => handleShare(item.title)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-2 hover:bg-white hover:scale-110 hover:shadow-xl transition-all duration-300 border border-white/50 group"
                  >
                    <Share2
                      size={18}
                      className="text-gray-600 group-hover:text-blue-600 transition-colors"
                    />
                  </button>

                  {/* Explore Button - Bottom Center */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-full px-4">
                    <button
                      onClick={() => handleExplore(item.title)}
                      className="w-full bg-white/90 backdrop-blur-sm text-gray-800 py-3 rounded-xl font-semibold shadow-lg hover:bg-white hover:shadow-xl hover:scale-105 transform transition-all duration-300 border border-white/50 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0"
                    >
                      Explore Now
                    </button>
                  </div>

                  <ExploreCard
                    image={item.image}
                    title={item.title}
                    properties={item.properties}
                    gradient={item.gradient}
                    color={item.color}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="flex justify-center items-center gap-4 mt-8">
          <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
              style={{
                width: `${(data.length - 2) * 10}%`
              }}
            ></div>
          </div>
          <span className="text-sm text-gray-500 font-medium min-w-[100px] text-center">
            {data.length} stay types
          </span>
        </div> */}

        {/* CTA Section */}
        {/* <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-purple-600 active:scale-95">
            View All Stay Types
          </button>
          <p className="text-gray-500 mt-4">
            Can't find what you're looking for?{" "}
            <button className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors">
              Contact our specialists
            </button>
          </p>
        </div> */}
      </div>
    </section>
  );
}

export default Explore;