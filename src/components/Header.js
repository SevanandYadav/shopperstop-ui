import React from 'react';

const Header = ({ cartCount, onCartClick }) => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo-section">
          <img src="/logo/fevicon.ico" alt="ShopperStop" className="logo" />
          <span className="logo-text">ShopperStop</span>
        </div>
        
        <div className="search-section">
          <div className="search-bar">
            <input type="text" placeholder="Search ShopperStop" className="search-input" />
            <button className="search-btn">🔍</button>
          </div>
        </div>
        
        <div className="header-actions">
          <button className="cart-btn" onClick={onCartClick}>
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cartCount}</span>
            <span className="cart-text">Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;