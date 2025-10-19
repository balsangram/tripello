import React from 'react';
// Make sure you have react-icons installed: npm install react-icons
import { FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';

function Location({ details }) {
  // If no details are passed, don't render anything
  if (!details) {
    return null;
  }

  const {
    latitude,
    longitude,
    rating,
    ratingDescription,
    distanceFromCenter,
    landmarks,
    mapImage,
  } = details;

  // Construct the Google Maps URL dynamically
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <section className="border-b pb-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Location</h3>
      <div className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Map and Rating */}
        <div className="md:col-span-1">
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block relative">
            <img 
              src={mapImage} 
              alt="Hotel Location Map" 
              className="rounded-lg object-cover w-full h-48"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-lg">
              <button className="bg-white text-gray-800 font-semibold px-4 py-2 rounded-md shadow-lg hover:bg-gray-100 transition">
                See Map
              </button>
            </div>
          </a>
          <div className="mt-3 text-center">
            <p className="text-2xl font-bold text-blue-600">{rating}</p>
            <p className="font-semibold">{ratingDescription}</p>
            <p className="text-sm text-gray-600">Location rating score</p>
          </div>
        </div>

        {/* Right Side: Details and Landmarks */}
        <div className="md:col-span-2">
          <div className="flex items-start mb-4">
            <FaMapMarkerAlt className="text-xl text-gray-500 mr-3 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-800">Exceptional location</h4>
              <p className="text-gray-600">{distanceFromCenter} from city center</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-3">Popular landmarks</h4>
            <ul className="space-y-2">
              {landmarks.map((landmark, index) => (
                <li key={index} className="flex justify-between items-center text-gray-700">
                  <div className="flex items-center">
                    <FaBuilding className="text-gray-500 mr-2" />
                    <span>{landmark.name}</span>
                  </div>
                  <span className="font-medium">{landmark.distance}</span>
                </li>
              ))}
            </ul>
            <a href="#" className="text-blue-600 font-semibold mt-4 inline-block hover:underline">
              See nearby places
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;