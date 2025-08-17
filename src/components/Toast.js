import React, { useEffect } from 'react';

const Toast = ({ message, show, onHide }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onHide, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div className="toast">
      ✅ {message}
    </div>
  );
};

export default Toast;