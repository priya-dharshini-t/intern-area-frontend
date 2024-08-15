import React, { useState } from 'react';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LanguageSelector from '../Home/LanguageSelector';

const Register = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isStudent, setStudent] = useState(true);
  const [isDivVisible, setDivVisible] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/register', { fname, lname, email, password }); // Replace with your actual backend endpoint
      if (response.data.success) {
        toast.success('Registration successful');
        navigate('/login');
      } else {
        toast.error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration failed');
    }
  };

  const handleSignin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
        toast.success('Login Success');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Login Failed');
      });
  };

  const setTrueForStudent = () => {
    setStudent(true);
  };

  const setFalseForStudent = () => {
    setStudent(false);
  };

  const showLogin = () => {
    setDivVisible(true);
  };

  const closeLogin = () => {
    setDivVisible(false);
  };

  const handleLanguageChange = (language) => {
    console.log('Language changed to:', language);
    // Additional logic for changing background color or other UI changes based on language
  };

  return (
    <div>
      <div className="form">
        <h1>Sign-up and Apply For Free</h1>
        <p className="para3">1,50,000+ companies hiring on Internshala</p>
        <div className="regi">
          <div className="py-6">
            <div className="flex bg-white rounded-lg justify-center shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
              <div className="w-full p-8 lg:w-1/2">
                <a
                  onClick={handleSignin}
                  className="flex items-center h-9 justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer"
                >
                  <div className="px-4 py-3">
                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                      <path
                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                        fill="#FFC107"
                      />
                      <path
                        d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                        fill="#FF3D00"
                      />
                      <path
                        d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                        fill="#4CAF50"
                      />
                      <path
                        d="M36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C18.5325 30 17.14 29.7425 15.835 29.2675L19.755 32.7408C21.9475 33.7217 24.3825 34.3333 27 34.3333C31.945 34.3333 36.2175 31.2775 38.5575 27.1933L36.6667 20Z"
                        fill="#1976D2"
                      />
                    </svg>
                  </div>
                  <div className="flex-grow px-4 py-2 text-lg text-center">
                    <div className="text-2xl text-center">Sign in with Google</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form">
        <div className="border-t border-gray-400 pt-4">
          <div>
            <div className="mt-4">
              <label htmlFor="email" className="border-b text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-gray-700 focus:outline-none focus:shadow-outline border rounded-lg py-2 px-4 block w-full appearance-none"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="border-b text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-gray-700 focus:outline-none focus:shadow-outline border rounded-lg py-2 px-4 block w-full appearance-none"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="firstName" className="border-b text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className="text-gray-700 focus:outline-none focus:shadow-outline border rounded-lg py-2 px-4 block w-full appearance-none"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="lastName" className="border-b text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="text-gray-700 focus:outline-none focus:shadow-outline border rounded-lg py-2 px-4 block w-full appearance-none"
                required
              />
            </div>
            <div className="mt-8">
              <button
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>

            <LanguageSelector onLanguageChange={handleLanguageChange} />
          </div>
        </div>
      </div>

      <div className="nav">
        <ul className="header1">
          <li>
            <a className="btn11" onClick={setTrueForStudent} style={{ cursor: 'pointer' }}>
              Student
            </a>
          </li>
          <li>
            <a className="btn11" onClick={setFalseForStudent} style={{ cursor: 'pointer' }}>
              Employer / T & P
            </a>
          </li>
        </ul>
      </div>

      {isDivVisible && (
        <div className="login-overlay">
          <div className="login-popup">
            <span className="close-btn" onClick={closeLogin}>
              &times;
            </span>
            <h2>Login Form</h2>
            <button onClick={handleSignin}>Sign in with Google</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;

