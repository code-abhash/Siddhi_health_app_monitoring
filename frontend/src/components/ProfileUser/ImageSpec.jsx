import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Profilespec = () => {
  const { username } = useParams(); // Extracts username from URL parameters
  const [profile, setProfile] = useState(null); // State to store profile data
  const [name, setName] = useState(""); // State to manage name input field
  const [specialty, setSpecialty] = useState(""); // State to manage specialty input field
  const [image, setImage] = useState(null); // State to manage profile image file
  const [currentImage, setCurrentImage] = useState(""); // State to store current profile image URL
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [isFormVisible, setIsFormVisible] = useState(false); // State to manage visibility of edit/create form
  const [user, setUser] = useState(null); // State to store user data
  const [error, setError] = useState(null); // State to manage error messages

  // Fetches user data based on username
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/?username=${username}`
        );
        const data = response.data;
        if (data.length > 0) {
          setUser(data[0]); // Sets user data if found
        } else {
          setUser(null); // Sets user to null if not found
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
      }
    };

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/profiles/${username}/`
        );
        if (response.data) {
          setProfile(response.data); // Sets profile data if found
          setName(response.data.name); // Sets name from profile data
          setSpecialty(response.data.specialty); // Sets specialty from profile data
          setCurrentImage(response.data.image); // Sets current profile image URL
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setProfile(null); // Sets profile to null if not found (404)
        } else {
          console.error("Error fetching profile:", error);
          setError("Failed to fetch profile data.");
        }
      } finally {
        setLoading(false); // Sets loading to false after fetch completes
      }
    };

    fetchUserData(); // Calls fetchUserData on component mount or when username changes
    fetchProfile(); // Calls fetchProfile on component mount or when username changes
  }, [username]);

  // Handles image file selection change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Sets image state to selected file
  };

  // Handles name input change
  const handleNameChange = (e) => {
    setName(e.target.value); // Updates name state on input change
  };

  // Handles form submission (update or create profile)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username); // Appends username to formData
    formData.append("name", name); // Appends name to formData
    formData.append("specialty", specialty); // Appends specialty to formData

    // Appends image to formData if selected, otherwise uses currentImage
    if (image) {
      formData.append("image", image);
    }

    try {
      let response;
      if (profile) {
        // If profile exists, update it using PUT request
        response = await axios.put(
          `http://127.0.0.1:8000/api/profiles/${username}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // If profile doesn't exist, create it using POST request
        response = await axios.post(
          `http://127.0.0.1:8000/api/profiles/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProfile(response.data); // Updates profile state after creation
      }
      alert("Profile updated successfully"); // Shows success message on update/create
      setIsFormVisible(false); // Hides form after submission
      window.location.reload(); // Reloads the page to reflect changes
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile."); // Sets error message on update/create failure
    }
  };

  // Handles cancellation of form editing
  const handleCancel = () => {
    setIsFormVisible(false); // Hides form on cancel
    setImage(null); // Clears image selection
  };

  // Conditional rendering based on loading, error, or user not found
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-red-600">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-5">User not found</div>;
  }

  // Renders profile form and details
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg overflow-hidden">
      {/* Display current profile image or upload placeholder */}
      {profile && (
        <div className="flex justify-center mb-6">
          {currentImage ? (
            <img
              src={`http://127.0.0.1:8000${currentImage}`}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-white"
            />
          ) : (
            <div className="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full shadow-inner">
              <span className="text-gray-500">Upload Profile Picture</span>
            </div>
          )}
        </div>
      )}
      {/* Display user and profile details */}
      <div className="text-center mb-6">
        <p className="text-gray-700 font-semibold text-lg">
          Username: {user.username}
        </p>
        <p className="text-gray-700 font-semibold text-lg">Name: {name}</p>
        <p className="text-gray-700 font-semibold text-lg">
          Specialty: {specialty}
        </p>
        <p className="text-gray-700 font-semibold text-lg">
          Email: {user.email}
        </p>
        <p className="text-gray-700 font-semibold text-lg">Role: {user.role}</p>
      </div>
      {/* Display edit/create profile button */}
      <div className="flex justify-center mb-6">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {profile ? "Edit Profile" : "Create Profile"}
        </button>
      </div>
      {/* Display profile edit/create form */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
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
          <div>
            <label
              htmlFor="specialty"
              className="block text-gray-700 font-medium mb-2"
            >
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
          <div>
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium mb-2"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            {image && (
              <div className="mt-4">
                <h3 className="text-gray-700 font-medium mb-2">Preview:</h3>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-white"
                />
              </div>
            )}
          </div>
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {profile ? "Save" : "Create"}
            </button>
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="text-center mt-6">
        <Link to="/home" className="text-blue-500 hover:underline">
          Click here to go to home page
        </Link>
      </div>
    </div>
  );
};

export default Profilespec;
