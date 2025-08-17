import React from 'react';

const ProductGrid = ({ products, onProductClick, onAddToCart }) => {
  console.log('ProductGrid rendering with products:', products);
  return (
    <div className="top-sellers">
      <h2>Top Sellers</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-info" onClick={() => onProductClick(product)}>
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
            </div>
            <button onClick={() => onAddToCart(product)} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;