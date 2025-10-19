import React, { useState, useEffect, useCallback } from 'react';

// --- Dummy Data (simulating an API response) ---
const dummyFeedbackData = [
  {
    id: 'customer1',
    quote: "This place is exactly like the picture posted on Tripeloo. Great service, we had a great stay!",
    name: 'Customer 1',
    location: 'Wayanad',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
  },
  {
    id: 'customer2',
    quote: "Absolutely breathtaking views and the amenities were top-notch. A perfect getaway from the city hustle.",
    name: 'Customer 2',
    location: 'Shimla',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
  },
  {
    id: 'customer3',
    quote: "The host was incredibly welcoming and gave us fantastic local tips. We felt right at home.",
    name: 'Customer 3',
    location: 'Goa',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
  }
];

// --- Individual Feedback Card Component ---
// This is the card that displays a single piece of feedback.

export function FeedbackCard({ quote, name, location }) {
  if (!quote) return null;

  return (
    <div className="text-center relative px-8">
      <span className="absolute -top-4 -left-4 text-8xl text-gray-100 font-serif opacity-50">“</span>
      <blockquote className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed z-10">
        {quote}
      </blockquote>
      <span className="absolute -bottom-12 -right-4 text-8xl text-gray-100 font-serif opacity-50">”</span>
      <div className="mt-8">
        <p className="font-bold text-lg text-gray-800">{name}</p>
        <p className="text-gray-500">{location}</p>
      </div>
    </div>
  );
}

// --- Main Feedback Section Component ---
// This component manages the state and renders the FeedbackCard carousel.
export default function FeedbackSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === dummyFeedbackData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const goToPrev = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? dummyFeedbackData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  useEffect(() => {
    // In a real app, you would fetch your data here.
    // For now, we just use the dummy data.
    const timer = setTimeout(goToNext, 6000); // Auto-slide every 6 seconds
    return () => clearTimeout(timer); // Cleanup timer
  }, [currentIndex, goToNext]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  }

  // These are for the decorative avatars around the main one
  const decorativeAvatars = [
    { id: 'd1', url: 'https://i.pravatar.cc/150?u=a', position: 'top-10 left-10 w-12 h-12' },
    { id: 'd2', url: 'https://i.pravatar.cc/150?u=b', position: 'top-1/4 right-12 w-10 h-10' },
    { id: 'd3', url: 'https://i.pravatar.cc/150?u=c', position: 'bottom-1/4 left-0 w-14 h-14' },
    { id: 'd4', url: 'https://i.pravatar.cc/150?u=d', position: 'bottom-1/3 right-1/4 w-8 h-8' },
    { id: 'd5', url: 'https://i.pravatar.cc/150?u=e', position: 'bottom-0 right-10 w-16 h-16' },
    { id: 'd6', url: 'https://i.pravatar.cc/150?u=f', position: 'bottom-10 left-1/3 w-10 h-10' }
  ];

  const currentFeedback = dummyFeedbackData[currentIndex];

  return (
    <div className="bg-gray-50/70 w-full py-20">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Good news from far away</h2>
        <p className="text-lg text-gray-600 mt-2">Let's see what people think of Tripeloo</p>
      </div>

      <div className="relative max-w-2xl mx-auto mt-16 flex flex-col items-center">

        {/* Decorative Avatars */}
        {decorativeAvatars.map(avatar => (
          <img key={avatar.id} src={avatar.url} alt="" className={`absolute rounded-full object-cover shadow-lg hidden md:block ${avatar.position}`} />
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
        <div className="relative bg-white/0 w-full min-h-[250px] flex items-center justify-center">
          {/* Prev Button */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300 opacity-80 hover:opacity-100 hidden md:block"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300 opacity-80 hover:opacity-100 hidden md:block"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center space-x-3 mt-8 z-10">
          {dummyFeedbackData.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-gray-800 scale-125' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${slideIndex + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}