import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../../config';

const handleLogout = (navigate) => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
};

const Profile = () => {
    const [profileData, setProfileData] = useState({ info: {} });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setError('No access token found. Please login again.');
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/user/profile/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfileData(response.data || { info: {} });
            } catch (err) {
                setError('Failed to fetch profile. Please check token or re-login.');
            }
        };

        fetchProfile();
    }, []);

    const message = profileData.Message || '';
    const firstName = profileData.info.first_name || 'N/A';
    const lastName = profileData.info.last_name || 'N/A';
    const email = profileData.info.email || 'N/A';
    const profile_pic = profileData.info.profile_pic;

    return (
        <div className="container mt-5 d-flex justify-content-center">
    <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        {error && (
            <div className="alert alert-danger text-center">{error}</div>
        )}

        {!error && (
            <>
                <div className="text-center mb-4">
                    {/* Placeholder for profile picture */}
                    <img 
                        src={profile_pic}
                        alt="User Profile" 
                        className="rounded-circle mb-3"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <h4 className="mb-1">{message}</h4>
                    <hr />
                </div>

                <div className="mb-3">
                    <p className="mb-1"><strong>First Name:</strong></p>
                    <p>{firstName}</p>

                    <p className="mb-1"><strong>Last Name:</strong></p>
                    <p>{lastName}</p>

                    <p className="mb-1"><strong>Email:</strong></p>
                    <p>{email}</p>
                </div>
            </>
        )}

        <div className="text-center mt-4">
            <Link to='/passwd-change/' className='btn btn-primary'>
                Change Password
            </Link>
        </div>
    </div>
</div>

    );
};

export { Profile, handleLogout };
