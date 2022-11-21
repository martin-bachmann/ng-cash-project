import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/NotFound.css';

function NotFound() {
  return (
    <div className="background">
      <div className="not-found-container">
        <h1>Page not found</h1>
        <Link
          to="/"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
