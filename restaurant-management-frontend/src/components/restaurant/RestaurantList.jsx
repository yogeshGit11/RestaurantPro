import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../../config';


const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');
  const accessToken = localStorage.getItem('access_token');

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/restaurant/get-restaurant/`);
      setRestaurants(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch restaurants.');
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const likeRestaurant = async (restaurantId) => {
    if (!accessToken) {
      alert('You must be logged in to like a restaurant.');
      return;
    }

    try {
      await axios.get(
        `http://127.0.0.1:8000/restaurant/restaurant/like/${restaurantId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      ).then((res) => {
        alert(res.data.Message)
      });
      fetchRestaurants();
    } catch (err) {
      alert('Failed to like restaurant.');
    }
  };

  const likeMenuItem = async (menuItemId) => {
    if (!accessToken) {
      alert('You must be logged in to like a menu item.');
      return;
    }

    try {
      await axios.get(
        `http://127.0.0.1:8000/restaurant/menuitem/like/${menuItemId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      ).then((res) => {
        alert(res.data.Message)
      });
      fetchRestaurants();
    } catch (err) {
      alert('Failed to like menu item.');
    }
  };

  const SaveMenuItem = async (menuItemId, restaurantId) => {
    if (!accessToken) {
      alert('You must be logged in to like a menu item.');
      return;
    }

    try {
      await axios.get(
        `http://127.0.0.1:8000/restaurant/menuitem/save/${menuItemId}/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      ).then((res) => {
        alert(res.data.Message)
      });
      fetchRestaurants();
    } catch (err) {
      alert('Failed to Save menu item.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center">
        <h2 className="mb-4">🍽 Restaurant Listings</h2>
        {accessToken && <Link to='/add-restaurant' className="btn btn-outline-primary btn-sm mb-3 ms-4"> ➕ Add Restaurant</Link>}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {restaurants.map((restaurant) => (
          <div className="col-md-6 mb-4" key={restaurant.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h4 className="card-title">{restaurant.name}</h4>

                {accessToken ? (
                  <button
                    className="btn btn-outline-danger btn-sm mb-2"
                    onClick={() => likeRestaurant(restaurant.id)}
                  >
                    ❤️ Like ({restaurant.total_likes})
                  </button>
                ) : (
                  <p className="text-muted">Login to like this restaurant.</p>
                )}

                {restaurant.menu_items && restaurant.menu_items.length > 0 ? (
                  <>
                    <div className="d-flex align-items-center mt-3">
                      <h6 className="mb-0 me-3">Menu Items:</h6>
                      {!accessToken ? "login to add menu" : <Link to={`/add-menu/${restaurant.id}`} className="btn btn-outline-info btn-sm">Add Menu</Link>}
                    </div>

                    <ul className="list-group mt-2">
                      {restaurant.menu_items.map((item, index) => (
                        <li
                          key={index}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          {item.name}
                          {accessToken ? (
                            <div className="d-flex align-items-center">
                              <button
                                className="btn btn-outline-primary btn-sm me-3"
                                onClick={() => likeMenuItem(item.id)}
                              >
                                ❤️ {item.menu_likes}
                              </button>
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => SaveMenuItem(item.id, restaurant.id)}
                              >
                                💾
                              </button>
                            </div>
                          ) : (
                            <span className="text-muted"><Link to='/login' style={{ 'textDecoration': 'None' }}>Login</Link> to like & Save</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="text-muted">No menu items available.</p>
                    {!accessToken ? "login to add menu" : <Link to={`/add-menu/${restaurant.id}`} className="btn btn-outline-info btn-sm">Add Menu</Link>}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
