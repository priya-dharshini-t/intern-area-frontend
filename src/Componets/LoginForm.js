import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loginHistory, setLoginHistory] = useState([]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email });
      if (response.data.message === 'OTP sent to email') {
        setIsOtpSent(true);
      } else {
        fetchLoginHistory();
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const fetchLoginHistory = async () => {
    try {
      const response = await axios.get(`/api/login-history?email=${email}`);
      setLoginHistory(response.data.loginHistory);
    } catch (error) {
      console.error('Failed to fetch login history:', error.message);
    }
  };

  useEffect(() => {
    if (email) {
      fetchLoginHistory();
    }
  }, [email]);

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={handleLogin}>Login</button>
      {isOtpSent && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
      <h3>Login History</h3>
      <ul>
        {loginHistory.map((history, index) => (
          <li key={index}>
            Browser: {history.browser}, OS: {history.os}, Device: {history.deviceType}, IP: {history.ipAddress}, Time: {new Date(history.loginTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoginForm;



