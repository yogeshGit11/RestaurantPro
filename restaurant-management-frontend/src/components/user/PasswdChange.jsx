import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config';

const PasswdChange = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        old_password: '',
        password1: '',
        password2: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({ ...errors, [e.target.name]: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrors({});
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            setMessage("User is not logged in. Please log in.");
            return;
        }

        try {
            const response = await axios.post('/api/user/passchange/', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setMessage(response.data.Message);
            setFormData({ old_password: '', password1: '', password2: '' });

            setTimeout(() => {
                navigate('/profile');
            }, 1500);
        } catch (error) {
            if (error.response?.data?.Message) {
                setMessage('Password change failed.');
            } else {
                setMessage('An unexpected error occurred.');
            }
        }
    };

    const renderError = (field) => {
        return errors[field] ? (
            <div className="text-danger small">{errors[field][0]}</div>
        ) : null;
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Change Password</h3>
                    <hr />
                    {message && <div className="alert alert-info">{message}</div>}

                    <form onSubmit={handleSubmit} className="row g-3 needs-validation">
                        <div className="col-12">
                            <label className="form-label">Old Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="old_password"
                                value={formData.old_password}
                                onChange={handleChange}
                                required
                            />
                            {renderError('old_password')}
                        </div>
                        <div className="col-12">
                            <label className="form-label">New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password1"
                                value={formData.password1}
                                onChange={handleChange}
                                required
                            />
                            {renderError('password1')}
                        </div>

                        <div className="col-12">
                            <label className="form-label">Confirm New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password2"
                                value={formData.password2}
                                onChange={handleChange}
                                required
                            />
                            {renderError('password2')}
                        </div>

                        <div className="col-12 d-grid mt-3">
                            <button type="submit" className="btn btn-warning btn-lg">Change Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default PasswdChange;
