// src/Componets/Home/LanguageSelector.js
import React, { useState } from 'react';
import axios from 'axios';

const LanguageSelector = ({ setSelectedLanguage, setOtpVerified }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLanguageChange = async (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);

    // For languages requiring OTP verification
    if (newLanguage === 'fr' && phoneNumber) {
      try {
        await axios.post('http://localhost:5000/api/send-otp-sms', { phoneNumber });
        setOtpVerified(true);
      } catch (error) {
        console.error('Error sending OTP:', error);
      }
    } else {
      setOtpVerified(true);
    }
  };

  return (
    <div>
      <select onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="zh">Chinese</option>
        <option value="fr">French</option>
        {/* Add more languages here */}
      </select>
      {/* For OTP input, you may need to handle visibility based on language */}
      {phoneNumber && <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />}
    </div>
  );
};

export default LanguageSelector;
