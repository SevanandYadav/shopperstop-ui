import React from 'react';

const ProductDetail = ({ product, onBack, onAddToCart }) => {
  return (
    <div className="pdp">
      <button onClick={onBack} className="back-btn">← Back</button>
      <div className="pdp-content">
        <img src={product.image} alt={product.name} className="pdp-image" />
        <div className="pdp-details">
          <h1>{product.name}</h1>
          <p className="pdp-price">₹{product.price}</p>
          <button onClick={() => onAddToCart(product)} className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;