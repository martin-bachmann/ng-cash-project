import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-background-img">
      <div className="not-found-component">
        <div className="not-found-wrapper">
          <h1>Page not found</h1>
          <Link
            to="/"
          >
            Home
          </Link>
        </div>
      </div>
    </div>

  );
}

export default NotFound;
