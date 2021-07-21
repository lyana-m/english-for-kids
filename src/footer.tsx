import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer-inner">
          <div className="github">
            <a href="https://github.com/lyana-m/">
              <img src="/assets/icons/github.svg" alt="github-logo" />
            </a>
          </div>
          <p className="year">2021</p>
          <div className="rs-logo">
            <a href="https://rs.school/js/">
              <img src="/assets/icons/rs-school.svg" alt="rs-school-logo" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
