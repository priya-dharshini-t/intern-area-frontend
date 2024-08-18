// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { selectUser, login, logout } from './Feature/Userslice';
import Home from './Componets/Home/Home';
import Register from './Componets/auth/Register';
import Navbar from './Componets/Navbar/Navbar';
import Footer from './Componets/Footerr/Footer';
import Intern from './Componets/Internships/Intern';
import JobAvl from './Componets/Job/JobAvl';
import JobDetail from './Componets/Job/JobDetail';
import InternDetail from './Componets/Internships/InternDeatil';
import Profile from './profile/Profile';
import AdminLogin from './Admin/AdminLogin';
import AdminPanel from './Admin/Adminpanel';
import ViewAllApplication from './Admin/ViewAllApplication';
import PostInternships from './Admin/Postinternships';
import DetailApplication from './Applications/DeatilApplication';
import UserApplication from './profile/UserApplicatiom';
import LanguageSelector from './Componets/Home/LanguageSelector';
import UserApplicationDetail from './Applications/DeatilApplicationUser';
import LoginHistory from './Componets/LoginHistory';
import i18n from './i18n';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyD2uU926I6Ba_qfsMHw6pj8Qi_8pzkQGkw",
  authDomain: "internarea-53e9d.firebaseapp.com",
  projectId: "internarea-53e9d",
  storageBucket: "internarea-53e9d.appspot.com",
  messagingSenderId: "262244681520",
  appId: "1:262244681520:web:e8257b77198c93165b2af5",
  measurementId: "G-GLM5R34T1F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          name: authUser.displayName,
          email: authUser.email,
          phoneNumber: authUser.phoneNumber,
        }));
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    if (otpVerified) {
      i18n.changeLanguage(selectedLanguage);
      const body = document.querySelector('body');
      switch (selectedLanguage) {
        case 'hi':
          body.style.backgroundColor = 'blue';
          break;
        case 'zh':
          body.style.backgroundColor = 'green';
          break;
        case 'fr':
          body.style.backgroundColor = 'yellow';
          break;
        default:
          body.style.backgroundColor = 'white';
      }
    }
  }, [selectedLanguage, otpVerified, i18n]);

  return (
    <div className="App">
      <header className="App-header">
        <LanguageSelector setSelectedLanguage={setSelectedLanguage} setOtpVerified={setOtpVerified} />
      </header>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/internship" element={<Intern />} />
        <Route path="/jobs" element={<JobAvl />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detailjob" element={<JobDetail />} />
        <Route path="/detailInternship" element={<InternDetail />} />
        <Route path="/detailApplication" element={<DetailApplication />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/postInternship" element={<PostInternships />} />
        <Route path="/applications" element={<ViewAllApplication />} />
        <Route path="/UserApplicationDetail" element={<UserApplicationDetail />} />
        <Route path="/userapplication" element={<UserApplication />} />
        <Route path="/login-history" element={<LoginHistory />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;









