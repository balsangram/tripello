import React from "react";

function FeaturedCard({ image, bedrooms, bathrooms, title, location, price }) {
  return (
    <div className="w-[320px] rounded-xl shadow-md overflow-hidden bg-white">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold mt-1">{title}</h2>

        <div className="flex items-center text-gray-500 text-sm mt-1">
          <span className="mr-1">📍</span>
          <span>{location}</span>
        </div>

        <p className="text-black font-semibold mt-3">
          ₹{price} <span className="text-gray-500 text-sm">/night</span>
        </p>
      </div>
    </div>
  );
}

export default FeaturedCard;
