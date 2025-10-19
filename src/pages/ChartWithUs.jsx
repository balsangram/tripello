import React, { useState, useRef, useEffect } from 'react';
import { AiFillStar, AiOutlineSearch, AiOutlineSend, AiOutlinePaperClip, AiOutlineInfoCircle } from 'react-icons/ai';
import { BsTelephone, BsThreeDotsVertical, BsCheck2All } from 'react-icons/bs';
import { FiImage, FiMapPin } from 'react-icons/fi';

function ChatWithUs() {
    const [selectedProvider, setSelectedProvider] = useState(1);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const messagesEndRef = useRef(null);
    const messageInputRef = useRef(null);

    const providers = [
        {
            id: 1,
            name: 'Goa Beach Resort & Spa',
            avatar: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&h=120&fit=crop&crop=center',
            lastMessage: 'Welcome to Goa Beach Resort! How can I help?',
            time: '2 min ago',
            rating: 4.8,
            location: 'Goa, India',
            category: 'Luxury Resort',
            unread: 2,
            online: true
        },
        {
            id: 2,
            name: 'Himalayan Heights Hotel',
            avatar: 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=120&h=120&fit=crop&crop=center',
            lastMessage: 'Mountain view rooms available for your dates.',
            time: '1 hour ago',
            rating: 4.6,
            location: 'Manali, Himachal',
            category: 'Boutique Hotel',
            unread: 0,
            online: true
        },
        {
            id: 3,
            name: 'Kerala Backwaters Retreat',
            avatar: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=120&h=120&fit=crop&crop=center',
            lastMessage: 'Houseboat booking details sent.',
            time: 'Yesterday',
            rating: 4.9,
            location: 'Alleppey, Kerala',
            category: 'Houseboat Stay',
            unread: 1,
            online: false
        },
        {
            id: 4,
            name: 'Royal Palace Heritage',
            avatar: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=120&h=120&fit=crop&crop=center',
            lastMessage: 'Special heritage suite offer for you.',
            time: '2 days ago',
            rating: 4.7,
            location: 'Udaipur, Rajasthan',
            category: 'Heritage Hotel',
            unread: 0,
            online: true
        },
    ];

    const initialMessages = {
        1: [
            { sender: 'provider', text: 'Welcome to Goa Beach Resort! How can I help with your booking?', time: '10:30 AM', read: true },
            { sender: 'user', text: 'Hi! I\'d like to know about your beach-facing rooms.', time: '10:32 AM', read: true },
            { sender: 'provider', text: 'We have luxury sea-view rooms starting at ₹8,500/night. Would you like details?', time: '10:33 AM', read: true },
            { sender: 'provider', text: 'All our beach-facing rooms include:\n• Private balcony\n• Ocean view\n• Free breakfast\n• Airport transfer', time: '10:34 AM', read: false },
        ],
        2: [
            { sender: 'provider', text: 'Namaste! Welcome to Himalayan Heights. Mountain view rooms available for your dates.', time: '09:15 AM', read: true },
            { sender: 'user', text: 'What amenities do you offer?', time: '09:20 AM', read: true },
        ],
        3: [
            { sender: 'provider', text: 'Hello! Your houseboat booking details have been prepared. Ready to share?', time: 'Yesterday', read: false },
        ],
        4: [
            { sender: 'provider', text: 'Welcome to Royal Palace Heritage. We have special suite offers for heritage stays.', time: '2 days ago', read: true },
        ],
    };

    const filteredProviders = providers.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setMessages(initialMessages);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (selectedProvider && messageInputRef.current) {
            messageInputRef.current.focus();
        }
    }, [selectedProvider]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = () => {
        if (message.trim() && selectedProvider) {
            const newMessage = {
                sender: 'user',
                text: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                read: false
            };

            setMessages(prev => ({
                ...prev,
                [selectedProvider]: [...(prev[selectedProvider] || []), newMessage]
            }));

            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // This prevents the default form submission behavior
            handleSendMessage();
        }
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission in search
        }
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <AiFillStar
                key={i}
                className={i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}
                size={14}
            />
        ));
    };

    const formatMessageText = (text) => {
        return text.split('\n').map((line, i) => (
            <span key={i}>
                {line}
                {i < text.split('\n').length - 1 && <br />}
            </span>
        ));
    };

    return (
        <div className="flex h-[85vh] bg-gradient-to-br from-gray-50 to-gray-100 mt-[5rem]">
            {/* Left Sidebar - Hotels List */}
            <div className="w-1/3 bg-white border-r border-gray-200 shadow-xl">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                            Chat with Hotels
                        </h2>
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded-full">
                            {providers.length} hotels
                        </span>
                    </div>
                    <div className="relative">
                        <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search hotels or locations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Hotels List */}
                <div className="overflow-y-auto h-[calc(50vh-140px)]">
                    {filteredProviders.map((hotel) => (
                        <div
                            key={hotel.id}
                            onClick={() => setSelectedProvider(hotel.id)}
                            className={`p-4 flex items-start cursor-pointer transition-all duration-300 border-b border-gray-100 group hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 ${selectedProvider === hotel.id
                                ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-200 shadow-inner'
                                : ''
                                }`}
                        >
                            <div className="relative">
                                <img
                                    src={hotel.avatar}
                                    alt={hotel.name}
                                    className="w-16 h-16 rounded-2xl object-cover mr-4 shadow-md group-hover:shadow-lg transition-shadow"
                                />
                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${hotel.online ? 'bg-green-500' : 'bg-gray-400'
                                    }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-1">
                                    <div className="flex items-center">
                                        <p className="text-sm font-semibold text-gray-900 truncate mr-2">{hotel.name}</p>
                                        {hotel.unread > 0 && (
                                            <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full min-w-[20px] text-center">
                                                {hotel.unread}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400 ml-2 whitespace-nowrap">{hotel.time}</p>
                                </div>
                                <div className="flex items-center mb-2">
                                    <div className="flex mr-1">{renderStars(hotel.rating)}</div>
                                    <span className="text-xs text-gray-600 font-medium mr-2">{hotel.rating}</span>
                                    <span className="text-xs text-gray-500">• {hotel.category}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-500 mb-1">
                                    <FiMapPin size={12} className="mr-1" />
                                    {hotel.location}
                                </div>
                                <p className="text-sm text-gray-600 truncate">{hotel.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Chat Section */}
            <div className="flex-1 flex flex-col bg-white shadow-2xl">
                {selectedProvider ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-6 bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="relative">
                                        <img
                                            src={providers.find(p => p.id === selectedProvider)?.avatar}
                                            alt="Hotel"
                                            className="w-14 h-14 rounded-2xl object-cover mr-4 shadow-md"
                                        />
                                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${providers.find(p => p.id === selectedProvider)?.online ? 'bg-green-500' : 'bg-gray-400'
                                            }`} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-xl">
                                            {providers.find(p => p.id === selectedProvider)?.name}
                                        </h3>
                                        <div className="flex items-center">
                                            <div className="flex mr-2">{renderStars(providers.find(p => p.id === selectedProvider)?.rating || 0)}</div>
                                            <span className="text-sm text-gray-600 mr-3">
                                                {providers.find(p => p.id === selectedProvider)?.rating}
                                            </span>
                                            <span className="text-sm text-gray-500 flex items-center">
                                                <FiMapPin size={14} className="mr-1" />
                                                {providers.find(p => p.id === selectedProvider)?.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button
                                        type="button"
                                        className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 rounded-xl"
                                    >
                                        <BsTelephone size={18} />
                                    </button>
                                    <button
                                        type="button"
                                        className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 rounded-xl"
                                    >
                                        <AiOutlineInfoCircle size={18} />
                                    </button>
                                    <button
                                        type="button"
                                        className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 rounded-xl"
                                    >
                                        <BsThreeDotsVertical size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100">
                            <div className="space-y-4 max-w-4xl mx-auto">
                                {messages[selectedProvider]?.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className="flex flex-col max-w-md">
                                            <div
                                                className={`px-5 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${msg.sender === 'user'
                                                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white rounded-br-none'
                                                    : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
                                                    }`}
                                            >
                                                <p className="text-sm leading-relaxed">
                                                    {formatMessageText(msg.text)}
                                                </p>
                                            </div>
                                            <div className={`flex items-center mt-1 space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                                                }`}>
                                                <p className={`text-xs ${msg.sender === 'user' ? 'text-red-300' : 'text-gray-500'}`}>
                                                    {msg.time}
                                                </p>
                                                {msg.sender === 'user' && (
                                                    <BsCheck2All className={`text-xs ${msg.read ? 'text-blue-400' : 'text-gray-400'
                                                        }`} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white border-t border-gray-200 shadow-lg">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex items-end space-x-3">
                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 rounded-xl"
                                        >
                                            <AiOutlinePaperClip size={20} />
                                        </button>
                                        <button
                                            type="button"
                                            className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 rounded-xl"
                                        >
                                            <FiImage size={20} />
                                        </button>
                                    </div>
                                    <div className="flex-1 relative">
                                        <textarea
                                            ref={messageInputRef}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Type your message... (Press Enter to send)"
                                            rows="1"
                                            className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none transition-all duration-200 bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleSendMessage}
                                        disabled={!message.trim()}
                                        className={`p-4 rounded-2xl transition-all duration-200 shadow-sm ${message.trim()
                                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg transform hover:scale-105'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <AiOutlineSend size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
                        <div className="text-center max-w-lg p-8">
                            <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-md">
                                    <AiOutlineSend className="text-white" size={36} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                Connect with Hotels
                            </h3>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                Start a conversation with your preferred hotel to discuss bookings, amenities, special requests, and get instant replies from hospitality professionals.
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {[
                                    { icon: '💬', text: 'Instant Messaging' },
                                    { icon: '🏨', text: 'Hotel Details' },
                                    { icon: '📅', text: 'Booking Assistance' },
                                    { icon: '⭐', text: 'Special Offers' }
                                ].map((item, index) => (
                                    <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="text-2xl mb-2">{item.icon}</div>
                                        <div className="text-gray-700 font-medium">{item.text}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatWithUs;