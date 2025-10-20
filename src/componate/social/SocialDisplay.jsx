import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaHeart,
  FaComment,
  FaShare,
  FaRegHeart,
  FaRegComment,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function SocialDisplay({ posts = [] }) {
  const [likedPosts, setLikedPosts] = useState({});
  const [visiblePosts, setVisiblePosts] = useState([]);

  useEffect(() => {
    // Simulate staggered loading animation
    const timer = setTimeout(() => {
      setVisiblePosts(posts);
    }, 100);
    return () => clearTimeout(timer);
  }, [posts]);

  const getIcon = (platform) => {
    const baseClasses = "text-lg transform transition-transform duration-300 hover:scale-110";
    switch (platform.toLowerCase()) {
      case "instagram":
        return <FaInstagram className={`text-pink-500 ${baseClasses}`} />;
      case "facebook":
        return <FaFacebookF className={`text-blue-600 ${baseClasses}`} />;
      case "twitter":
        return <FaTwitter className={`text-sky-400 ${baseClasses}`} />;
      case "youtube":
        return <FaYoutube className={`text-red-500 ${baseClasses}`} />;
      default:
        return null;
    }
  };

  const handleLike = (index) => {
    setLikedPosts(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const likeVariants = {
    liked: {
      scale: [1, 1.4, 1],
      transition: {
        duration: 0.4
      }
    },
    unliked: {
      scale: 1
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto flex flex-col gap-6 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {visiblePosts.map((post, index) => (
          <motion.div
            key={`${post.id || post.platform}-${index}`}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer backdrop-blur-sm bg-white/95"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full overflow-hidden shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {post.userImage ? (
                    <img
                      src={post.userImage}
                      alt={post.user || "user"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-semibold">
                      {post.user?.charAt(0) || "G"}
                    </div>
                  )}
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{post.user || "Guest"}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    {post.platform}
                    <span className="text-gray-400">•</span>
                    <span>{post.date || "Just now"}</span>
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                {getIcon(post.platform)}
              </motion.div>
            </div>

            {/* Caption */}
            {post.caption && (
              <div className="px-4 py-3 bg-white">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-bold text-gray-900 mr-1">{post.user || "Guest"}:</span>
                  {post.caption}
                </p>
              </div>
            )}

            {/* Image */}
            {post.image && (
              <motion.div 
                className="relative overflow-hidden bg-gray-100"
                variants={imageVariants}
              >
                <img
                  src={post.image}
                  alt="social media"
                  className="w-full h-72 object-cover"
                />
                <motion.div 
                  className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/40 flex items-center justify-center transition-all duration-300"
                  whileHover={{ opacity: 1 }}
                >
                  <motion.a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-semibold bg-black/70 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(0,0,0,0.8)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Original Post
                  </motion.a>
                </motion.div>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
                  onClick={() => handleLike(index)}
                >
                  <motion.div
                    variants={likeVariants}
                    animate={likedPosts[index] ? "liked" : "unliked"}
                  >
                    {likedPosts[index] ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="hover:text-red-500" />
                    )}
                  </motion.div>
                  <span className="text-sm font-medium">
                    {post.likes || (likedPosts[index] ? 1 : 0)}
                  </span>
                </motion.button>

                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors duration-200"
                >
                  <FaRegComment className="hover:text-blue-500" />
                  <span className="text-sm font-medium">{post.comments || 0}</span>
                </motion.button>

                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors duration-200"
                >
                  <FaShare className="hover:text-green-500" />
                  <span className="text-sm font-medium">{post.shares || 0}</span>
                </motion.button>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-xs text-gray-400 bg-white px-2 py-1 rounded-full border"
              >
                {post.views ? `${post.views} views` : 'Viewed'}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Empty State */}
      {posts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 text-6xl mb-4">📱</div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No posts yet</h3>
          <p className="text-gray-500">Social media posts will appear here</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default SocialDisplay;