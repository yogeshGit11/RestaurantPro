import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config';

const AddMenu = () => {
    const { id } = useParams();
    const [menuItemName, setMenuItemName] = useState('');
    const [statusMessage, setStatusMessage] = useState(null);
    const accessToken = localStorage.getItem('access_token');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!menuItemName.trim()) {
            setStatusMessage('Menu item name cannot be empty');
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/restaurant/add-menuitem/${id}/`,
                { name: menuItemName },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );

            if (response.status === 201) {
                setStatusMessage(response.data?.Message || 'Menu item added successfully');
                setMenuItemName('');
                setTimeout(() => {
                    navigate('/restaurants');
                }, 1500);
            } else {
                setStatusMessage('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error adding menu item:', error);
            setStatusMessage(error?.response?.data?.Message || 'An unexpected error occurred');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Add Menu Item</h3>
                    <hr />

                    <form onSubmit={handleSubmit} className="mt-3">
                        <div className="mb-3">
                            <label htmlFor="menuName" className="form-label">Menu Item Name</label>
                            <input
                                type="text"
                                id="menuName"
                                className="form-control"
                                value={menuItemName}
                                onChange={(e) => setMenuItemName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-success btn-lg">Add Item</button>
                        </div>
                    </form>

                    {statusMessage && (
                        <div className="alert alert-warning mt-3">
                            {statusMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default AddMenu;
