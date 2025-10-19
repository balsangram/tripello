export function FeedbackCard({ quote, name, location }) {
  if (!quote) return null;

  return (
    <div className="text-center relative px-8 py-12 bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
      <span className="absolute -top-6 -left-4 text-9xl text-indigo-100 font-serif opacity-75">“</span>
      <blockquote className="text-xl md:text-2xl text-gray-800 font-serif italic leading-relaxed z-10 mb-6">
        {quote}
      </blockquote>
      <span className="absolute -bottom-6 -right-4 text-9xl text-indigo-100 font-serif opacity-75">”</span>
      <div className="mt-10 relative z-20">
        <div className="w-20 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-4 rounded-full"></div>
        <p className="font-bold text-xl text-gray-900 tracking-wide">{name}</p>
        <p className="text-indigo-600 font-medium mt-1">{location}</p>
      </div>
    </div>
  );
}