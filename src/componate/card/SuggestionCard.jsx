import React from "react";

function SuggestionCard({ image, title, subtitle }) {
  return (
    <div className="w-[300px] bg-[#f8f1e7] p-4 rounded-2xl flex flex-col items-center">
      {/* Image Container */}
      <div className="w-full h-[350px] overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Section */}
      <h3 className="mt-4 text-lg font-semibold text-center">
        {title}
      </h3>
      <p className="text-gray-500 text-sm text-center">
        {subtitle}
      </p>
    </div>
  );
}

export default SuggestionCard;