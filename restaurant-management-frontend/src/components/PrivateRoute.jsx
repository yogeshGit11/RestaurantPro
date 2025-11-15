import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';

const PrivateRoute = ({ children }) => {
    const [isValid, setIsValid] = useState(null);

    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    useEffect(() => {
        const verifyToken = async () => {
            if (!accessToken) {
                setIsValid(false);
                return;
            }

            try {
                const response = await axios.post(
                    '/api/user/varify-token/',
                    { token: accessToken },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                if (response.data && Object.keys(response.data).length === 0) {
                    setIsValid(true);
                } else {
                    setIsValid(false);
                }
            } catch (err) {
                console.warn('Access token invalid/expired:', err?.response?.data);
                if (refreshToken) {
                    try {
                        const refreshResponse = await axios.post(
                            '/api/user/get-new-token/',
                            { refresh: refreshToken },
                            { headers: { 'Content-Type': 'application/json' } }
                        );

                        const newAccess = refreshResponse.data.access;
                        if (newAccess) {
                            localStorage.setItem('access_token', newAccess);
                            setIsValid(true);
                            alert('Now token is refreshed')
                        } else {
                            throw new Error('No access token in refresh response');
                        }
                    } catch (refreshErr) {
                        console.error('Refresh failed:', refreshErr?.response?.data);
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                        setIsValid(false);
                        alert('Pls Login again')
                    }
                } else {
                    setIsValid(false);
                }
            }
        };

        verifyToken();
    }, [accessToken, refreshToken]);

    if (isValid === null) {
        return <div>Loading...</div>;
    }

    return isValid ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
