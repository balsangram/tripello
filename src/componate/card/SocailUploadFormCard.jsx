import React, { useState } from 'react';
import { FiUpload, FiImage, FiLink, FiX } from 'react-icons/fi';

function SocialUploadFormCard({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        platform: 'Instagram',
        caption: '',
        image: null,
        imageUrl: '',
        link: '',
    });
    const [isImageUrl, setIsImageUrl] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Upload to Social Media</h3>
                <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
                    <FiX size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Platform Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                    <select
                        name="platform"
                        value={formData.platform}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    >
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Twitter">Twitter (X)</option>
                        <option value="YouTube">YouTube</option>
                    </select>
                </div>

                {/* Caption */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                    <textarea
                        name="caption"
                        value={formData.caption}
                        onChange={handleInputChange}
                        placeholder="Write your caption here... Add emojis, hashtags, etc."
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        required
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Media</label>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="radio"
                                id="file-upload"
                                checked={!isImageUrl}
                                onChange={() => setIsImageUrl(false)}
                                className="rounded"
                            />
                            <label htmlFor="file-upload" className="text-sm text-gray-600 cursor-pointer">
                                Upload File
                            </label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                id="url-upload"
                                checked={isImageUrl}
                                onChange={() => setIsImageUrl(true)}
                                className="rounded"
                            />
                            <label htmlFor="url-upload" className="text-sm text-gray-600 cursor-pointer">
                                Image URL
                            </label>
                        </div>
                    </div>

                    {isImageUrl ? (
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full p-3 mt-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    ) : (
                        <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors bg-gray-50">
                            <FiUpload size={24} className="text-gray-400 mr-2" />
                            <span className="text-sm text-gray-500">Click to upload image (JPG, PNG, up to 5MB)</span>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>

                {/* Link */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Link (Optional)</label>
                    <div className="relative">
                        <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleInputChange}
                            placeholder="https://example.com/post"
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                        Upload Post
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SocialUploadFormCard;