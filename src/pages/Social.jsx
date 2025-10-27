import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import SocialDisplay from "../../src/componate/card/SocialCard";
import SocialUploadFormCard from "../../src/componate/card/SocailUploadFormCard"; // Adjust path as needed

function Social() {
  const [socialPosts, setSocialPosts] = useState([
    {
      platform: "Instagram",
      image: "https://source.unsplash.com/400x300/?hotel,beach",
      caption: "Sunset views from our oceanfront rooms 🌅 #BeachResort",
      link: "https://instagram.com/hotelpage",
    },
    {
      platform: "Facebook",
      image: "https://source.unsplash.com/400x300/?hotel,lobby",
      caption: "Experience luxury and comfort in every corner 🏨",
      link: "https://facebook.com/hotelpage",
    },
    {
      platform: "Twitter",
      caption: "Enjoy exclusive deals this festive season 🎉 #StayLuxury",
      link: "https://twitter.com/hotelpage",
    },
    {
      platform: "YouTube",
      image: "https://source.unsplash.com/400x300/?spa,resort",
      caption: "Watch our spa transformation video 💆‍♀️✨",
      link: "https://youtube.com/hotelpage",
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);

  const handleNewPostSubmit = (formData) => {
    if (formData.caption.trim()) {
      // Process image if present
      if (formData.image) {
        // File upload: convert to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          const postWithImage = {
            ...formData,
            image: reader.result, // base64 data URL
            imageUrl: undefined, // Clear URL if file was used
            id: Date.now()
          };
          setSocialPosts((prev) => [...prev, postWithImage]);
          setShowPopup(false);
        };
        reader.readAsDataURL(formData.image);
      } else if (formData.imageUrl) {
        // URL provided: use directly
        const postWithUrl = {
          ...formData,
          image: formData.imageUrl,
          image: formData.imageUrl, // Set as image string
          id: Date.now()
        };
        setSocialPosts((prev) => [...prev, postWithUrl]);
        setShowPopup(false);
      } else {
        // No image
        setSocialPosts((prev) => [...prev, { ...formData, id: Date.now() }]);
        setShowPopup(false);
      }
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Follow Us on Social Media
      </h2>

      {/* Add Post Button - Positioned on the right */}
      <button
        onClick={() => setShowPopup(true)}
        className="absolute top-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors flex items-center justify-center"
        style={{ width: "50px", height: "50px" }}
      >
        <FaPlus size={20} />
      </button>

      <SocialDisplay posts={socialPosts} />

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-200">
            <SocialUploadFormCard
              onSubmit={handleNewPostSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Social;