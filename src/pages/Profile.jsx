import React, { useState, useEffect } from 'react';
import { apiHandler } from '../utils/api'; // Adjust path if needed

const initialProfile = {
  fullName: '',
  username: '',
  email: '',
  gender: '',
  dateofBirth: '',
  phoneNumber: '',
  address: '',
  aboutYou: ''
};

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(initialProfile);
  const [error, setError] = useState(null);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setError(null);
        const res = await apiHandler({
          url: '/users/me',
          method: 'GET'
        });
        console.log('API Response:', res); // Debug log
        if (res?.user) {
          setProfile({
            fullName: res.user.fullName || '',
            username: res.user.username || '',
            email: res.user.email || '',
            gender: res.user.gender || '',
            dateofBirth: res.user.dateofBirth ? new Date(res.user.dateofBirth).toISOString().split('T')[0] : '',
            phoneNumber: res.user.phoneNumber || '',
            address: res.user.address || '',
            aboutYou: res.user.aboutYou || ''
          });
        } else {
          console.warn('No user data from API, using initial profile');
          setProfile(initialProfile);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setError(error?.message || 'Failed to fetch profile');
        setProfile(initialProfile);
        // Don't alert for now, to avoid popups during testing
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile) {
      alert('Profile data is not available');
      return;
    }
    setIsEditing(false);
    try {
      const updateData = {
        fullName: profile.fullName,
        username: profile.username,
        email: profile.email,
        gender: profile.gender,
        dateofBirth: profile.dateofBirth,
        phoneNumber: profile.phoneNumber,
        address: profile.address,
        aboutYou: profile.aboutYou
      };
      await apiHandler({
        url: '/users/updateUserDetails',
        method: 'PATCH',
        data: updateData
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert(error?.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error && !profile.fullName && !profile.username) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Account Information</h1>

        <div className="flex justify-center mb-4 relative">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center border-2 border-gray-300">
            <span className="text-gray-500 text-sm">Profile</span>
          </div>
          <button className="absolute bottom-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
            +
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={profile?.fullName || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={profile?.username || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile?.email || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={profile?.gender || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Other">Other</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateofBirth"
                  value={profile?.dateofBirth || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={profile?.phoneNumber || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={profile?.address || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">About You</label>
              <textarea
                name="aboutYou"
                value={profile?.aboutYou || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows="4"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleEditToggle}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Full Name</h2>
                <p className="text-gray-600">{profile?.fullName || 'Not provided'}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Username</h2>
                <p className="text-gray-600">{profile?.username || 'Not provided'}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Email</h2>
                <p className="text-gray-600">{profile?.email || 'Not provided'}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Gender</h2>
                <p className="text-gray-600">{profile?.gender || 'Not provided'}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Date of Birth</h2>
                <p className="text-gray-600">{profile?.dateofBirth ? new Date(profile.dateofBirth).toLocaleDateString() : 'Not provided'}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Phone Number</h2>
                <p className="text-gray-600">{profile?.phoneNumber || 'Not provided'}</p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Address</h2>
              <p className="text-gray-600">{profile?.address || 'Not provided'}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">About You</h2>
              <p className="text-gray-600">{profile?.aboutYou || 'Not provided'}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleEditToggle}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;