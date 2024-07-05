
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PasswordResetConfirm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const { username, token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/reset/${username}/${token}/`, { password });
            setMessage('Password has been reset successfully.');
            navigate('/login');  // Redirect to login page after successful reset
        } catch (error) {
            setMessage('Error resetting password.');
        }
    };

    return (
        <div className="bg-gray-500 min-h-3/4 flex flex-col justify-center items-center p-4">
            <div className="max-w-sm w-full bg-white rounded-lg overflow-hidden shadow-lg p-4 space-y-4">
                <h2 className="text-2xl mb-4 text-center">Set New Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            New Password:
                        </label>
                        <input
                            type="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Reset Password
                    </button>
                </form>
                {message && <p className="text-sm text-gray-600">{message}</p>}
            </div>
        </div>
    );
};

export default PasswordResetConfirm;
