import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-xl font-bold">Company Auth System</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/login" className="hover:underline">Login</Link>
          </li>
          <li>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </li>
          <li>
            <Link to="/company/profile" className="hover:underline">Company Profile</Link>
          </li>
          <li>
            <Link to="/company/dashboard" className="hover:underline">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;