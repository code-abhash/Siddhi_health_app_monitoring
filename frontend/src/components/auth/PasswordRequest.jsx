
import React, { useState } from 'react';
import axios from 'axios';

const PasswordResetRequest = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/password_reset/', { username });
            setMessage('Password reset email sent.');
        } catch (error) {
            setMessage('Error sending password reset email.');
            console.log(error)
        }
    };

    return (
        <div className="bg-gray-500 min-h-3/4 flex flex-col justify-center items-center p-4">
            <div className="max-w-sm w-full bg-white rounded-lg overflow-hidden shadow-lg p-4 space-y-4">
                <h2 className="text-2xl mb-4 text-center">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1">
                            Username:
                        </label>
                        <input
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Send Password Reset Email
                    </button>
                </form>
                {message && <p className="text-sm text-gray-600">{message}</p>}
            </div>
        </div>
    );
};

export default PasswordResetRequest;
