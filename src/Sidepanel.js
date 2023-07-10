import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './SidePanel.css';
import { AuthContext } from './App';
import { useContext } from 'react';

function SidePanel() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMobileView, setMobileView] = useState(false);
  const { isLoggedIn, email, login, logout, mailChange } = useContext(AuthContext);

  const handleDashboardClick = () => {
    setShowDashboard(!showDashboard);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="side-panel">
      <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={handleMenuToggle}>
        <FontAwesomeIcon className="hamburger-icon" icon={faBars} />
      </button>

      <div className={`sidebar ${isMobileView && isMenuOpen ? 'show' : ''}`}>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a
              className={`nav-link ${showDashboard ? 'active' : ''}`}
              href="#!"
              onClick={handleDashboardClick}
            >
              Dashboards
              <FontAwesomeIcon
                className="pl-20"
                icon={showDashboard ? faAngleDown : faAngleRight}
                style={{ paddingLeft: '13px' }}
              />
            </a>
            {showDashboard && (
              <ul className="nav flex-column sub-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/stocks" onClick={handleMenuClick}>
                    Overview
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/curren" onClick={handleMenuClick}>
                    Currency Converter
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/exch" onClick={handleMenuClick}>
                    Exchange Rate
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/lose" onClick={handleMenuClick}>
                    Major Losers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/gain" onClick={handleMenuClick}>
                    Major Gainers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/news" onClick={handleMenuClick}>
                    News and Insights
                  </Link>
                </li>
                {isLoggedIn && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/Watch" onClick={handleMenuClick}>
                      WatchList
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </li>

          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={handleMenuClick}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register" onClick={handleMenuClick}>
                  Register
                </Link>
              </li>
            </>
          )}

          {isLoggedIn && (
            <li className="nav-item">
              <div className="nav-link" onClick={handleLogout}>
                Logout
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SidePanel;
