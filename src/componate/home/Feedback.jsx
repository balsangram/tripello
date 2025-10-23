import React, { useState, useEffect, useCallback } from 'react';
import { apiHandler } from '../../utils/api'; // Adjust the import path to your api.js file

// --- Individual Feedback Card Component ---
export function FeedbackCard({ quote, name, location }) {
  if (!quote) return null;

  return (
    <div className="text-center relative px-12 py-10 flex flex-col justify-between">
      <div className="relative">
        <span className="absolute -top-4 -left-6 text-7xl text-indigo-100 font-serif opacity-75 leading-none">"</span>
        <blockquote className="text-lg md:text-xl text-gray-800 font-serif italic leading-relaxed z-10 pt-4 px-2">
          {quote}
        </blockquote>
        <span className="absolute -bottom-2 -right-6 text-7xl text-indigo-100 font-serif opacity-75 leading-none">"</span>
      </div>
      <div className="mt-8 relative z-20">
        <div className="w-20 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-4 rounded-full"></div>
        <p className="font-bold text-lg text-gray-900 tracking-wide">{name}</p>
        <p className="text-indigo-600 font-medium mt-1 text-sm">{location}</p>
      </div>
    </div>
  );
}

// --- Main Feedback Section Component ---
export default function FeedbackSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch feedback data from API using apiHandler
  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiHandler({
          url: "/customer/top_review",
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
        } else if (response.reviews && Array.isArray(response.reviews)) {
          dataArray = response.reviews;
        } else if (response.feedback && Array.isArray(response.feedback)) {
          dataArray = response.feedback;
        } else {
          throw new Error("API response is not in expected format");
        }

        if (dataArray.length === 0) {
          throw new Error("No feedback available from API");
        }

        // Transform API data to match feedback format
        const transformedData = dataArray.map((item, index) => ({
          id: item.id || item._id || `customer${index + 1}`,
          quote: item.quote || item.review || item.comment || item.feedback || item.text || "Great experience!",
          name: item.name || item.customerName || item.userName || `Customer ${index + 1}`,
          location: item.location || item.city || item.place || "Unknown Location",
          avatarUrl:
            item.avatarUrl ||
            item.avatar ||
            item.image ||
            item.photo ||
            `https://images.unsplash.com/photo-${1507003211169 + index}?q=80&w=1887&auto=format&fit=crop`,
        }));

        setFeedbackData(transformedData);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError(err.message || "Failed to fetch feedback");
        setFeedbackData(getDefaultFeedback()); // Fallback to default data
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackData();
  }, []);

  const getDefaultFeedback = () => [
    {
      id: "customer1",
      quote: "This place is exactly like the picture posted on Tripeloo. Great service, we had a great stay!",
      name: "Customer 1",
      location: "Wayanad",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    },
    {
      id: "customer2",
      quote: "Absolutely breathtaking views and the amenities were top-notch. A perfect getaway from the city hustle.",
      name: "Customer 2",
      location: "Shimla",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    },
    {
      id: "customer3",
      quote: "The host was incredibly welcoming and gave us fantastic local tips. We felt right at home.",
      name: "Customer 3",
      location: "Goa",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    },
  ];

  const goToNext = useCallback(() => {
    if (feedbackData.length === 0) return;
    const isLastSlide = currentIndex === feedbackData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, feedbackData.length]);

  const goToPrev = useCallback(() => {
    if (feedbackData.length === 0) return;
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? feedbackData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, feedbackData.length]);

  useEffect(() => {
    if (feedbackData.length === 0) return;
    const timer = setTimeout(goToNext, 6000); // Auto-slide every 6 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, goToNext, feedbackData.length]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const decorativeAvatars = [
    { id: "d1", url: "https://i.pravatar.cc/150?u=a", position: "top-10 left-10 w-12 h-12" },
    { id: "d2", url: "https://i.pravatar.cc/150?u=b", position: "top-1/4 right-12 w-10 h-10" },
    { id: "d3", url: "https://i.pravatar.cc/150?u=c", position: "bottom-1/4 left-0 w-14 h-14" },
    { id: "d4", url: "https://i.pravatar.cc/150?u=d", position: "bottom-1/3 right-1/4 w-8 h-8" },
    { id: "d5", url: "https://i.pravatar.cc/150?u=e", position: "bottom-0 right-10 w-16 h-16" },
    { id: "d6", url: "https://i.pravatar.cc/150?u=f", position: "bottom-10 left-1/3 w-10 h-10" },
  ];

  // Loading State
  if (loading) {
    return (
      <div className="relative w-full py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Good news from far away
          </h2>
          <p className="text-lg text-gray-600 mt-2">Let's see what people think of Tripeloo</p>
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600">Loading feedback...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="relative w-full py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Good news from far away
          </h2>
          <p className="text-lg text-gray-600 mt-2">Let's see what people think of Tripeloo</p>
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Feedback</h3>
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
      </div>
    );
  }

  // Empty State
  if (feedbackData.length === 0) {
    return (
      <div className="relative w-full py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Good news from far away
          </h2>
          <p className="text-lg text-gray-600 mt-2">Let's see what people think of Tripeloo</p>
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
              <p className="text-gray-600">Be the first to share your experience!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentFeedback = feedbackData[currentIndex];

  return (
    <div className="relative w-full py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Good news from far away
        </h2>
        <p className="text-lg text-gray-600 mt-2">Let's see what people think of Tripeloo</p>

        <div className="relative max-w-2xl mx-auto mt-16 flex flex-col items-center">
          {/* Decorative Avatars */}
          {decorativeAvatars.map((avatar) => (
            <img
              key={avatar.id}
              src={avatar.url}
              alt=""
              className={`absolute rounded-full object-cover shadow-lg hidden md:block ${avatar.position}`}
            />
          ))}

          {/* Main Avatar */}
          <div className="relative mb-6 z-10">
            <img
              src={currentFeedback.avatarUrl}
              alt={currentFeedback.name}
              className="w-28 h-28 rounded-full object-cover shadow-2xl ring-4 ring-white"
            />
          </div>

          {/* Feedback Card with Navigation Buttons */}
          <div className="relative w-full px-4 md:px-8">
            {/* Prev Button */}
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <FeedbackCard
              quote={currentFeedback.quote}
              name={currentFeedback.name}
              location={currentFeedback.location}
            />

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 text-gray-700"
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

          {/* Dot Navigation */}
          <div className="flex justify-center space-x-3 mt-8 z-10">
            {feedbackData.map((_, slideIndex) => (
              <button
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === slideIndex ? "bg-gray-800 scale-125" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${slideIndex + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}