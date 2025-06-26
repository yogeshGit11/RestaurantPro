import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: ''
    });

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
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
        try {
            await axios.post(`${API_BASE_URL}/user/register/`, formData);
            setMessage('User registered successfully!');
            setErrors({});
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error) {
            if (error.response?.data) {
                setErrors(error.response.data);
                setMessage('Please correct the errors below.');
            } else {
                setMessage('Registration failed. Server error.');
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
            <div className="card shadow-lg p-4" style={{ maxWidth: '700px', width: '100%' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Register</h3>
                    <hr />
                    {message && <div className="alert alert-info">{message}</div>}

                    <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            {renderError('username')}
                        </div>

                        <div className="col-md-6">
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

                        <div className="col-md-6">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                            {renderError('first_name')}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                            {renderError('last_name')}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {renderError('password')}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Confirm Password</label>
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
                            <button type="submit" className="btn btn-success btn-lg">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Register;