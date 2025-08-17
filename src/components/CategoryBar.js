import React from 'react';

const CategoryBar = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'computers', name: 'Computers' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'audio', name: 'Audio' }
  ];

  return (
    <nav className="category-bar">
      <div className="category-menu">
        <span className="menu-icon">☰</span>
        <span className="all-text">All</span>
      </div>
      <div className="categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default CategoryBar;