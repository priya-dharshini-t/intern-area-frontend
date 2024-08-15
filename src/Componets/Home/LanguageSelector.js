import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    switch (language) {
      case 'hi':
        setBackgroundColor('blue');
        break;
      case 'zh':
        setBackgroundColor('green');
        break;
      case 'fr':
        setBackgroundColor('yellow');
        break;
      default:
        setBackgroundColor('white');
    }
    document.body.style.backgroundColor = backgroundColor;
  }, [language, backgroundColor]);

  const handleLanguageChange = (event) => {
    const lng = event.target.value;
    setLanguage(lng);
    i18n.changeLanguage(lng);

    if (lng === 'fr') {
      // Request email if French is selected
      const userEmail = prompt('Enter your email address:');
      if (userEmail) {
        setInputValue(userEmail);
        sendOtpEmail(userEmail);
      }
    } else {
      // Request phone number if not French
      const userPhone = prompt('Enter your phone number:');
      if (userPhone) {
        setInputValue(userPhone);
        sendOtpSMS(userPhone);
      }
    }
  };

  const sendOtpEmail = async (email) => {
    try {
      const response = await fetch('/api/send-otp-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('OTP sent to your email. Please check your inbox.');
      } else {
        const errorText = await response.text();
        alert(`Failed to send OTP: ${errorText}`);
      }
    } catch (error) {
      console.error('Error sending OTP email:', error);
      alert('Failed to send OTP. Please try again.');
    }
  };

  const sendOtpSMS = async (phoneNumber) => {
    try {
      const response = await fetch('/api/send-otp-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (response.ok) {
        alert('OTP sent to your phone. Please check your messages.');
      } else {
        const errorText = await response.text();
        alert(`Failed to send OTP: ${errorText}`);
      }
    } catch (error) {
      console.error('Error sending OTP SMS:', error);
      alert('Failed to send OTP. Please try again.');
    }
  };

  return (
    <div>
      <label htmlFor="language-select">{i18n.t('Select Language')}:</label>
      <select id="language-select" value={language} onChange={handleLanguageChange}>
        <option value="">{i18n.t('Select language')}</option>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="es">Spanish</option>
        <option value="pt">Portuguese</option>
        <option value="zh">Chinese</option>
        <option value="fr">French</option>
      </select>
      <input 
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={language === 'fr' ? 'Enter your email' : 'Enter your phone number'}
      />
    </div>
  );
};

export default LanguageSelector;

