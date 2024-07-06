import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Profilespec = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/?username=${username}`);
        const data = response.data;
        if (data.length > 0) {
          setUser(data[0]);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data.');
      }
    };

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/profiles/${username}/`);
        if (response.data) {
          setProfile(response.data);
          setName(response.data.name);
          setSpecialty(response.data.specialty);
          setCurrentImage(response.data.image); // Set current profile image URL
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Profile not found, set profile to null
          setProfile(null);
        } else {
          console.error('Error fetching profile:', error);
          setError('Failed to fetch profile data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchProfile();
  }, [username]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('name', name); // Include name in formData
    formData.append('specialty', specialty);

    // Append image to formData if selected, otherwise use currentImage
    if (image) {
      formData.append('image', image);
    }

    try {
      let response;
      if (profile) {
        response = await axios.put(`http://127.0.0.1:8000/api/profiles/${username}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await axios.post(`http://127.0.0.1:8000/api/profiles/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setProfile(response.data); // Update profile state after creation
      }
      alert('Profile updated successfully');
      setIsFormVisible(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile.');
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-red-600">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-5">User not found</div>;
  }

  return (
    <div
      className="max-w-2xl m-auto p-4 bg-gray-300 shadow-md rounded-lg overflow-hidden"
      style={{ maxHeight: '600px' }} // Set max-height for the containing div
    >
      {profile && (
        <>
          {currentImage ? (
            <img
              src={`http://127.0.0.1:8000${currentImage}`}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full mt-4"
            />
          ) : (
            <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full m-4">
              <span className="text-gray-500">Upload Profile Picture</span>
            </div>
          )}
        </>
      )}
      <p className="text-gray-600 font-bold">Username: {user.username}</p>
      <p className="text-gray-600 font-bold">Name: {name}</p>
      <p className="text-gray-600 font-bold">Specialty: {specialty}</p>
      <p className="text-gray-600 font-bold">Email: {user.email}</p>
      <p className="text-gray-600 font-bold">Role: {user.role}</p>

      <button
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {profile ? 'Edit Profile' : 'Create Profile'}
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="specialty" className="block text-gray-700 font-bold mb-2">
              Specialty
            </label>
            <input
              type="text"
              id="specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            {/* Display current image URL if available */}
            {currentImage && (
              <p className="mt-2 text-gray-600 hidden">Current Image: {currentImage}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {profile ? 'Save' : 'Create'}
          </button>
        </form>
      )}
      <Link to='/home' className='text-gray-600'>Click here to go to home page</Link> 
    </div>
  );
};

export default Profilespec;
