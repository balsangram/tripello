import React from 'react';

function ExploreCard({ image, title, properties }) {
  return (
    <div className="w-[250px] rounded-lg shadow-md overflow-hidden bg-white">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover"
      />

      {/* Text */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-500">{properties.toLocaleString()} properties</p>
      </div>
    </div>
  );
}

export default ExploreCard;