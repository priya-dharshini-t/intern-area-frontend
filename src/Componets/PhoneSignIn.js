import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
const firebaseConfig = {
    apiKey: "AIzaSyD2uU926I6Ba_qfsMHw6pj8Qi_8pzkQGkw",
    authDomain: "internarea-53e9d.firebaseapp.com",
    projectId: "internarea-53e9d",
    storageBucket: "internarea-53e9d.appspot.com",
    messagingSenderId: "262244681520",
    appId: "1:262244681520:web:e8257b77198c93165b2af5",
    measurementId: "G-GLM5R34T1F"
  };
  function PhoneSignIn() {
    const { t } = useTranslation();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const PhoneSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        console.log("reCAPTCHA resolved");
        // Handle reCAPTCHA resolved event
      },
      'expired-callback': () => {
        console.log("reCAPTCHA expired");
        // Handle reCAPTCHA expired event
      }
    }, auth); // Pass the auth instance here
  };

  const handleSignIn = () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        const otpCode = prompt('Enter the OTP sent to your phone:');
        if (otpCode) {
          confirmationResult.confirm(otpCode).then(() => {
            alert('Phone number verified!');
            // Handle successful verification
          }).catch(error => {
            console.error('Error verifying OTP:', error);
          });
        }
      }).catch(error => {
        console.error('Error sending SMS:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In with Phone Number</button>
      <div id="recaptcha-container"></div>
    </div>
  );
};
  }
export default PhoneSignIn;

