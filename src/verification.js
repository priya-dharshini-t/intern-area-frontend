// src/verification.js
import nodemailer from 'nodemailer';
import firebase from 'firebase/app'; // Import firebase/app instead of the entire firebase module
import 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyD2uU926I6Ba_qfsMHw6pj8Qi_8pzkQGkw",
  authDomain: "internarea-53e9d.firebaseapp.com",
  projectId: "internarea-53e9d",
  storageBucket: "internarea-53e9d.appspot.com",
  messagingSenderId: "262244681520",
  appId: "1:262244681520:web:e8257b77198c93165b2af5",
  measurementId: "G-GLM5R34T1F"
};
firebase.initializeApp(firebaseConfig);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

export const sendEmailOTP = () => {
  return new Promise((resolve, reject) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'recipient-email@gmail.com',
      subject: 'OTP for Language Change',
      text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

export const sendMobileOTP = () => {
  const phoneNumber = '9345794284'; // Replace with the user's phone number
  const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

  return firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      const otp = window.prompt('Enter the OTP sent to your mobile:');
      return confirmationResult.confirm(otp);
    });
};

