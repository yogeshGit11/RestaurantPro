import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

const SavedMenus = () => {
    const [savedMenus, setSavedMenus] = useState([]);
    const [userName, setUserName] = useState('');
    const [error, setError] = useState(null);

    const accessToken = localStorage.getItem('access_token');

    const fetchSavedMenus = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/restaurant/get-saved-menuitems/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setUserName(response.data["User Name"]);
            setSavedMenus(response.data["Saved MenuItems"]);
            setError(null);
        } catch (err) {
            setError('Failed to fetch saved menu items.');
        }
    }, [accessToken]);

    useEffect(() => {
        fetchSavedMenus();
    }, [fetchSavedMenus]);

    const handleRemove = async (menuId) => {
        if (!window.confirm('Are you sure you want to remove this menu item?')) return;

        try {
            await axios.delete(`${API_BASE_URL}/restaurant/remove-saved-menuitem/${menuId}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            fetchSavedMenus();
        } catch (err) {
            setError('Failed to remove the menu item.');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">
                Saved Menu Items for <span className="text-primary">{userName}</span>
            </h2>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {savedMenus.length === 0 ? (
                <div className="alert alert-info" role="alert">
                    No saved menu items found.
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {savedMenus.map((menuItem) => (
                        <div key={menuItem.id} className="col mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{menuItem["item name"]}</h5>
                                    <p className="card-text">
                                        {menuItem["restaurant"]
                                            ? `Restaurant: ${menuItem["restaurant"]}`
                                            : "Restaurant not specified"}
                                    </p>
                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={() => handleRemove(menuItem.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedMenus;
