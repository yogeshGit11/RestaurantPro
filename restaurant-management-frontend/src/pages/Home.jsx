import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const accessToken = localStorage.getItem('access_token');
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover Restaurant And Food...Buddy</h1>
          <p className="hero-subtitle">Delicious food. Friendly vibes. A perfect spot to relax, eat, and enjoy with loved ones.</p>

          <div className="navigation-section">
            <Link to='/restaurants' className="btn btn-primary m-3">List Restaurants</Link>
            {accessToken && <Link to='/saved-menus' className="btn btn-warning m-3">Saved Menus Items</Link>}
          </div>

          <div className="food-carousel">
            <div className="food-item">
              <img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=300&fit=crop" alt="Soup" className="food-image" />
            </div>
            <div className="food-item">
              <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop" alt="Salad" className="food-image" />
            </div>
            <div className="food-item">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop" alt="Bowl" className="food-image" />
            </div>
            <div className="food-item">
              <img src="https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=300&h=300&fit=crop" alt="Curry" className="food-image" />
            </div>
          </div>
        </div>
      </div>

      <div className="popular-section">
        <h2 className="section-title">Enjoy Our Delicious Meal</h2>
      </div>
    </div>
  );
};

export default Home;