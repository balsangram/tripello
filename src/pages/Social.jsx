import React from "react";
import SocialDisplay from "../componate/social/SocialDisplay"; // adjust path if needed

function Social() {
  const socialPosts = [
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
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Follow Us on Social Media
      </h2>

      <SocialDisplay posts={socialPosts} />
    </div>
  );
}

export default Social;
