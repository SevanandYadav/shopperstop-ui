import React from 'react';

const OrderSuccess = ({ onContinueShopping }) => {
  return (
    <div className="order-success">
      <div className="success-content">
        <div className="success-icon">🎉</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your order has been confirmed.</p>
        <div className="success-details">
          <p>✅ Payment completed</p>
          <p>📦 Order will be processed shortly</p>
          <p>📧 Confirmation email sent</p>
        </div>
        <button onClick={onContinueShopping} className="continue-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;