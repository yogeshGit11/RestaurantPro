import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../../config';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
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
        try {
            const response = await axios.post(`${API_BASE_URL}/user/login/`, formData);
            setMessage(response.data.Message || 'Login successful!');
            setErrors({});

            localStorage.setItem('access_token', response.data.Token.access);
            localStorage.setItem('refresh_token', response.data.Token.refresh);
            navigate('/profile');

        } catch (error) {
            if (error.response?.data) {
                setMessage('Login failed. Check your credentials.');
                setErrors(error.response.data);
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
                    <h3 className="card-title text-center mb-4">Login</h3>
                    <hr />
                    {message && <div className="alert alert-info">{message}</div>}

                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                        <div className="mb-3">
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

                        <div className="mb-3">
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

                        <div className="d-grid mb-3">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>

                        <div className="text-center">
                            <Link to="/reset-passwd" className="btn btn-link text-decoration-none">
                                Forgot Password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Login;
