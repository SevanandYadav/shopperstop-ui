import React from 'react';

const Cart = ({ cart, onUpdateQuantity, onRemoveFromCart, onContinueShopping, onProceedToBuy }) => {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <span>{item.name}</span>
              <span>₹{item.price}</span>
              <div className="quantity-controls">
                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <strong>Total: ₹{getTotalPrice()}</strong>
          </div>
          <div className="cart-actions">
            <button onClick={() => onProceedToBuy(getTotalPrice())} className="proceed-btn">
              Proceed to Buy
            </button>
          </div>
        </>
      )}
      <button onClick={onContinueShopping}>Continue Shopping</button>
    </div>
  );
};

export default Cart;