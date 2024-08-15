import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Add this import
import axios from 'axios';

const LoginHistory = () => {
  const [history, setHistory] = useState([]);
  const user = useSelector((state) => state.user); // Ensure state structure matches your setup

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`/api/loginhistories/${user.uid}`);
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching login history', error);
      }
    };

    if (user.uid) {
      fetchHistory();
    }
  }, [user.uid]);

  return (
    <div>
      <h2>Login History</h2>
      <ul>
        {history.map((login) => (
          <li key={login._id}>
            {login.device} | {login.browser} | {login.os} | {login.ip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoginHistory;
