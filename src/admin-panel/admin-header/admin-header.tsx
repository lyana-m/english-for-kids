import React from 'react';
import { useHistory } from 'react-router-dom';

export const AdminHeader = () => {
  const history = useHistory();

  return (
    <header className="admin-header">
      <div className="wrapper">
        <div className="admin-header-inner">
          <div className="admin-header-nav">
            <h2 className="admin-nav-item">Categories</h2>
            <h2 className="admin-nav-item">Words</h2>
          </div>
          <button
            onClick={() => {
              history.push('/');
              localStorage.removeItem('accessToken');
            }}
            className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
