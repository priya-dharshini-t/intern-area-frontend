// src/services/authService.js
import axios from 'axios';

const getIpAddress = async () => {
  // Implementation to get the user's IP address
  // Example using an external service:
  const response = await axios.get('https://api.ipify.org?format=json');
  return response.data.ip;
};

const getDeviceType = () => {
  // Implementation to determine the device type
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) return 'Mobile';
  if (/tablet/i.test(ua)) return 'Tablet';
  return 'Desktop';
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    if (response.data.success) {
      const userId = response.data.userId; // Ensure your login API returns the user ID

      // Log the login information
      const loginInfo = {
        userId,
        ip: await getIpAddress(),
        browser: navigator.userAgent,
        os: navigator.platform,
        device: getDeviceType(),
      };

      await axios.post('http://localhost:5000/api/log-login', loginInfo);

      console.log('User logged in and login information logged.');
    }
  } catch (error) {
    console.error('Error logging in user:', error);
  }
};
