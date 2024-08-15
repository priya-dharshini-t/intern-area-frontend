// src/components/VerifySmsOtp.js

import React, { useState } from 'react';

const VerifySmsOtp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const verifySmsOtp = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/verify-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error verifying SMS OTP');
      console.error('Error verifying SMS OTP:', error);
    }
  };

  return (
    <div>
      <h2>Verify SMS OTP</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifySmsOtp}>Verify OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifySmsOtp;
