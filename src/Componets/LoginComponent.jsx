import React, { useState } from 'react';
import axios from 'axios';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [language, setLanguage] = useState('en'); // Default language
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let loginData;
      if (language === 'fr') {
        loginData = { language, email, otp };
      } else {
        loginData = { language, phoneNumber, otp };
      }

      const response = await axios.post('/api/login', loginData);

      const { token, user } = response.data;

      // Store token in localStorage or use in your preferred state management
      localStorage.setItem('token', token);

      // Handle user login, redirect, etc.
      console.log('User logged in:', user);
      
    } catch (error) {
      console.error('Login error:', error.response.data.message);
      // Handle login error (show message to user, etc.)
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    // Reset inputs and visibility based on language change
    setEmail('');
    setPhoneNumber('');
    setOtp('');

    if (selectedLanguage === 'fr') {
      setShowEmailInput(true);
      setShowPhoneInput(false);
    } else {
      setShowEmailInput(false);
      setShowPhoneInput(true);
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Select Language:
            <select value={language} onChange={handleLanguageChange}>
              <option value="en">English</option>
              <option value="fr">French</option>
              {/* Add other language options */}
            </select>
          </label>
        </div>
        {showEmailInput && (
          <div>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
          </div>
        )}
        {showPhoneInput && (
          <div>
            <label>
              Phone Number:
              <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            </label>
          </div>
        )}
        <div>
          <label>
            OTP:
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
