// Real payment verification service
export const verifyPayment = async (transactionId, amount) => {
  try {
    // Call payment gateway API (UPI/Razorpay/Paytm etc.)
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionId, amount })
    });
    
    const result = await response.json();
    return result.status === 'success';
  } catch (error) {
    console.error('Payment verification failed:', error);
    return false;
  }
};

// Poll payment status
export const pollPaymentStatus = async (orderId) => {
  try {
    const response = await fetch(`/api/payment-status/${orderId}`);
    const result = await response.json();
    return result.status; // 'pending', 'success', 'failed'
  } catch (error) {
    return 'failed';
  }
};