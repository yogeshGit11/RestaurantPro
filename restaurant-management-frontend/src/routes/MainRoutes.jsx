import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Navbar from '../pages/Navbar';

import PrivateRoute from '../components/PrivateRoute';
import Register from '../components/user/Register';
import Login from '../components/user/Login';
import { Profile } from '../components/user/Profile';
import PasswdChange from '../components/user/PasswdChange';
import ResetPasswd from '../components/user/ResetPasswd';

import RestaurantList from '../components/restaurant/RestaurantList';
import AddMenu from '../components/restaurant/AddMenu';
import AddRestaurant from '../components/restaurant/AddRestaurant';
import SavedMenus from '../components/restaurant/SavedMenus';

export default function MainRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/passwd-change" element={<PrivateRoute><PasswdChange /></PrivateRoute>} />
                <Route path="/reset-passwd" element={<ResetPasswd />} />

                <Route path="/restaurants" element={<RestaurantList />} />
                <Route path="/add-menu/:id" element={<PrivateRoute><AddMenu /></PrivateRoute>} />
                <Route path="/add-restaurant" element={<PrivateRoute><AddRestaurant /></PrivateRoute>} />
                <Route path="/saved-menus" element={<PrivateRoute><SavedMenus /></PrivateRoute>} />
            </Routes>
        </>
    );
}
