import { handleLogout } from '../components/user/Profile';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('access_token');
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 shadow-sm">
      <Link
        className="navbar-brand fw-semibold text-uppercase"
        to="/"
        style={{ fontSize: '1.4rem', fontFamily: 'Poppins, sans-serif' }}
      >
        <img
          src="/cutlery.png"
          alt="RestaurantPro Logo"
          style={{ width: '30px', height: '30px', marginRight: '10px' }}
        />
        Restaurant<span className="text-danger">Pro</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link fw-semibold" to="/" aria-current="page">Home</Link>
          </li>

          <li className="nav-item">
            <Link to="/restaurants" className="nav-link fw-semibold">Restaurants</Link>
          </li>

          {!isLoggedIn && (
            <li className="nav-item">
              <Link to="/login" className="nav-link fw-semibold">Login</Link>
            </li>
          )}

          {!isLoggedIn && (
            <li className="nav-item">
              <Link to="/register" className="nav-link fw-semibold">Register</Link>
            </li>
          )}

          {isLoggedIn && (
            <li className="nav-item">
              <Link to="/profile" className="nav-link fw-semibold">Profile</Link>
            </li>
          )}

          {isLoggedIn && (
            <li className="nav-item">
              <button
                className="btn btn-sm btn-danger nav-link fw-semibold"
                onClick={() => handleLogout(navigate)}
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        <form className="d-flex my-2 my-lg-0 ms-auto">
          <input
            className="form-control me-2 rounded-pill"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success rounded-pill" type="submit">Search</button>
        </form>
      </div>
    </nav>

  );
};

export default Navbar;
