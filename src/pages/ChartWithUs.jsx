import React, { useState, useRef, useEffect } from 'react';
import { AiFillStar, AiOutlineSearch, AiOutlineSend, AiOutlinePaperClip, AiOutlineInfoCircle } from 'react-icons/ai';
import { BsTelephone, BsThreeDotsVertical, BsCheck2All } from 'react-icons/bs';
import { FiImage, FiMapPin } from 'react-icons/fi';
import { apiHandler } from '../utils/api';

function ChatWithUs() {
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);

    const messagesContainerRef = useRef(null);
    const messageInputRef = useRef(null);

    // Filter providers based on search
    const filteredProviders = providers.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Scroll to top on page load
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    // Fetch providers on mount
    useEffect(() => {
        const fetchProviders = async () => {
            try {
                setLoading(true);
                const data = await apiHandler({ url: '/chat/booking/displayStayChart', method: 'GET' });
                if (data.success) {
                    const mappedProviders = data.stays.map(stay => ({
                        id: stay._id,
                        name: stay.title,
                        avatar: stay.image,
                        lastMessage: 'Welcome! How can I help with your booking?',
                        time: 'Now',
                        rating: stay.average_rating,
                        location: `${stay.city_name}, ${stay.state_name}`,
                        category: 'Hotel',
                        unread: 0,
                        online: true
                    }));

                    setProviders(mappedProviders);

                    // Initialize messages for each provider
                    const initialMsgs = {};
                    mappedProviders.forEach(provider => {
                        initialMsgs[provider.id] = [{
                            sender: 'provider',
                            text: `Welcome to ${provider.name}! How can I help with your booking?`,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            read: true
                        }];
                    });
                    setMessages(initialMsgs);

                    if (mappedProviders.length > 0) setSelectedProvider(mappedProviders[0].id);
                }
            } catch (error) {
                console.error('Failed to fetch providers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProviders();
    }, []);

    // Scroll chat to bottom whenever messages change
    useEffect(() => {
        messagesContainerRef.current?.scrollTo({ top: messagesContainerRef.current.scrollHeight, behavior: 'auto' });
    }, [messages, selectedProvider]);

    const handleSendMessage = () => {
        if (!message.trim() || !selectedProvider) return;
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
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const renderStars = (rating) => Array.from({ length: 5 }, (_, i) => (
        <AiFillStar key={i} size={14} className={i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'} />
    ));

    const formatMessageText = (text) => text.split('\n').map((line, i) => (
        <span key={i}>{line}{i < text.split('\n').length - 1 && <br />}</span>
    ));

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading hotels...</p>
            </div>
        </div>
    );

    return (
        <div className="flex h-[90vh] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Sidebar */}
            <div className="w-1/3 flex flex-col bg-white border-r border-gray-200 shadow-2xl rounded-r-3xl">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 rounded-tr-3xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">Chat with Hotels</h2>
                        <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
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
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
                        />
                    </div>
                </div>
                {/* Hotel List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredProviders.length ? filteredProviders.map(hotel => (
                        <div key={hotel.id} onClick={() => setSelectedProvider(hotel.id)}
                            className={`p-4 flex items-start cursor-pointer border-b border-gray-100 group hover:bg-gradient-to-r hover:from-red-50 hover:to-white transition-all duration-300 ${selectedProvider === hotel.id
                                ? 'bg-gradient-to-r from-red-50 to-white border-l-4 border-l-red-500 shadow-md'
                                : 'border-l-4 border-l-transparent'
                                }`}>
                            <div className="relative">
                                <img src={hotel.avatar} alt={hotel.name} className="w-16 h-16 rounded-2xl object-cover mr-4 shadow-lg transition-transform duration-300 group-hover:scale-105" />
                                {/* <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${hotel.online ? 'bg-green-500' : 'bg-gray-400'}`} /> */}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-1">
                                    <p className="text-sm font-semibold text-gray-900 truncate mr-2 group-hover:text-red-700 transition-colors duration-200">{hotel.name}</p>
                                    <p className="text-xs text-gray-400 ml-2 bg-gray-100 px-2 py-1 rounded-full">{hotel.time}</p>
                                </div>
                                <div className="flex items-center mb-2">
                                    <div className="flex mr-1">{renderStars(hotel.rating)}</div>
                                    <span className="text-xs text-gray-600 font-medium mr-2 bg-yellow-50 px-1.5 py-0.5 rounded">{hotel.rating}</span>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{hotel.category}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-500 mb-1">
                                    <FiMapPin size={12} className="mr-1" />
                                    <span className="bg-blue-50 px-2 py-0.5 rounded-full">{hotel.location}</span>
                                </div>
                                <p className="text-sm text-gray-600 truncate bg-gray-50 px-2 py-1 rounded-lg">{hotel.lastMessage}</p>
                            </div>
                        </div>
                    )) : <div className="p-4 text-center text-gray-500">No hotels found matching your search.</div>}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white shadow-2xl rounded-l-3xl overflow-hidden">
                {selectedProvider ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-6 bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 flex items-center justify-between rounded-tl-3xl">
                            <div className="flex items-center">
                                <div className="relative">
                                    <img src={providers.find(p => p.id === selectedProvider)?.avatar} alt="Hotel" className="w-14 h-14 rounded-2xl object-cover mr-4 shadow-lg" />
                                    {/* <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm ${providers.find(p => p.id === selectedProvider)?.online ? 'bg-green-500' : 'bg-gray-400'}`} /> */}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                        {providers.find(p => p.id === selectedProvider)?.name}
                                    </h3>
                                    <div className="flex items-center">
                                        <div className="flex mr-2">{renderStars(providers.find(p => p.id === selectedProvider)?.rating || 0)}</div>
                                        <span className="text-sm text-gray-600 mr-3 bg-yellow-50 px-1.5 py-0.5 rounded">{providers.find(p => p.id === selectedProvider)?.rating}</span>
                                        <span className="text-sm text-gray-500 flex items-center bg-blue-50 px-2 py-0.5 rounded-full">
                                            <FiMapPin size={14} className="mr-1" />
                                            {providers.find(p => p.id === selectedProvider)?.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100">
                            <div className="space-y-4 max-w-4xl mx-auto">
                                {messages[selectedProvider]?.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className="flex flex-col max-w-md">
                                            <div className={`px-5 py-3 rounded-2xl shadow-lg transition-all duration-300 ${msg.sender === 'user'
                                                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white rounded-br-none shadow-red-200'
                                                : 'bg-white text-gray-900 rounded-bl-none border border-gray-200 shadow-gray-200'
                                                }`}>
                                                <p className="text-sm leading-relaxed">{formatMessageText(msg.text)}</p>
                                            </div>
                                            <div className={`flex items-center mt-1 space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <p className={`text-xs ${msg.sender === 'user' ? 'text-red-300' : 'text-gray-500'}`}>{msg.time}</p>
                                                {msg.sender === 'user' && <BsCheck2All className={`text-xs ${msg.read ? 'text-blue-400' : 'text-gray-400'}`} />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-6 bg-white border-t border-gray-200 shadow-lg rounded-bl-3xl">
                            <div className="max-w-4xl mx-auto flex items-end space-x-3">
                                <textarea
                                    ref={messageInputRef}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    rows={1}
                                    className="flex-1 w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm hover:shadow-md"
                                />
                                <button onClick={handleSendMessage} disabled={!message.trim()}
                                    className={`p-4 rounded-2xl transition-all duration-200 shadow-sm ${message.trim()
                                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg transform hover:scale-105 shadow-red-200'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}>
                                    <AiOutlineSend size={20} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-l-3xl">
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                                <AiOutlineSend size={32} className="text-gray-400" />
                            </div>
                            <p className="text-gray-600 text-lg font-medium">Select a hotel to start chatting</p>
                            <p className="text-gray-400 text-sm mt-2">Choose from the list to begin your conversation</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatWithUs;