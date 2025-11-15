import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config';

const ResetPasswd = () => {
    const [formData, setFormData] = useState({
        email: '',
        password1: '',
        password2: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

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
        try {
            const response = await axios.post('/api/user/reset-password/', formData);
            setMessage(response.data.Message);
            setFormData({
                email: '',
                password1: '',
                password2: ''
            });
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error) {
            if (error.response?.data) {
                setMessage(`❌ Password reset failed. ${error.response.data.Message}`);
                setErrors(error.response.data);
            } else {
                setMessage('❌ An unexpected error occurred.');
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
                    <h3 className="card-title text-center mb-4">Reset Password</h3>
                    <hr />
                    {message && <div className="alert alert-info">{message}</div>}

                    <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
                        <div className="col-12">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {renderError('email')}
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
                            <button type="submit" className="btn btn-warning btn-lg">Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default ResetPasswd;
