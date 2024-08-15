// src/components/VerifyOtp.js

import React, { useState } from 'react';

const VerifyOtp = () => {
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const verifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, otp }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error verifying OTP');
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Identifier (Email or Phone)"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp}>Verify OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyOtp;
