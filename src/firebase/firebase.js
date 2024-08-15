import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, GoogleAuthProvider, signInWithPhoneNumber } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2uU926I6Ba_qfsMHw6pj8Qi_8pzkQGkw",
  authDomain: "internarea-53e9d.firebaseapp.com",
  projectId: "internarea-53e9d",
  storageBucket: "internarea-53e9d.appspot.com",
  messagingSenderId: "262244681520",
  appId: "1:262244681520:web:e8257b77198c93165b2af5",
  measurementId: "G-GLM5R34T1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Auth Provider
const provider = new GoogleAuthProvider();

// Function to setup reCAPTCHA
const setupRecaptcha = () => {
  if (!app) {
    console.error("Firebase app is not initialized.");
    return;
  }

  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible',
    'callback': (response) => {
      console.log("reCAPTCHA resolved");
    },
    'expired-callback': () => {
      console.log("reCAPTCHA expired");
    }
  }, auth); // Ensure 'auth' is correctly initialized

  window.recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  }).catch((error) => {
    console.error("Error rendering reCAPTCHA:", error);
  });
};


// Export auth, provider, and setupRecaptcha
export {app, auth, provider, setupRecaptcha, signInWithPhoneNumber };
