// Example usage in another page, e.g., PostDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import SocialCard from './SocialCard'; // Adjust path as needed

function PostDetail() {
    const { postId } = useParams(); // Assuming route param for post ID

    // Sample data - in real app, fetch from API or props
    const postDetails = {
        user: {
            name: "Guest",
            profilePic: "https://via.placeholder.com/40x40?text=G"
        },
        platform: "Instagram",
        time: "Just now",
        caption: "Sunset views from our oceanfront rooms 🌅 #BeachResort",
        image: "https://source.unsplash.com/400x300/?sunset,ocean",
        likes: 0,
        comments: 0,
        shares: 0,
        link: "https://instagram.com/hotelpage"
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-center">Post Details</h1>
                <SocialCard {...postDetails} />
            </div>
        </div>
    );
}

export default PostDetail;