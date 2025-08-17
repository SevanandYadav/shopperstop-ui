import React, { useState, useEffect } from 'react';

const Payment = ({ cart, totalAmount, onPaymentComplete, onBack }) => {
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, processing, success, failed
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (paymentStatus === 'processing') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            // Simulate random payment result
            const success = Math.random() > 0.3; // 70% success rate
            setPaymentStatus(success ? 'success' : 'failed');
            if (success) {
              setTimeout(() => onPaymentComplete(), 2000);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [paymentStatus, onPaymentComplete]);

  const handlePayNow = () => {
    setPaymentStatus('processing');
    setCountdown(30);
  };

  const handleRetry = () => {
    setPaymentStatus('pending');
    setCountdown(30);
  };

  return (
    <div className="payment">
      <button onClick={onBack} className="back-btn">← Back to Cart</button>
      
      <div className="payment-content">
        <h2>Payment</h2>
        
        <div className="order-summary">
          <h3>Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} className="order-item">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="order-total">
            <strong>Total: ₹{totalAmount}</strong>
          </div>
        </div>

        {paymentStatus === 'pending' && (
          <div className="payment-options">
            <h3>Payment Options</h3>
            <div className="qr-payment">
              <p>Scan QR Code to Pay</p>
              <img src="/qr/payment-QR.jpg" alt="Payment QR Code" className="qr-code" />
              <button onClick={handlePayNow} className="pay-btn">
                Pay ₹{totalAmount}
              </button>
            </div>
          </div>
        )}

        {paymentStatus === 'processing' && (
          <div className="payment-processing">
            <h3>Processing Payment...</h3>
            <div className="spinner"></div>
            <p>Please wait while we process your payment</p>
            <p>Time remaining: {countdown}s</p>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="payment-success">
            <h3>✅ Payment Successful!</h3>
            <p>Your order has been placed successfully.</p>
            <p>You will be redirected shortly...</p>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="payment-failed">
            <h3>❌ Payment Failed</h3>
            <p>There was an issue processing your payment.</p>
            <button onClick={handleRetry} className="retry-btn">
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;