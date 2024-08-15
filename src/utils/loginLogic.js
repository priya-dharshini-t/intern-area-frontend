import getUserDetails from './userDetails';
import { sendEmailOTP, sendMobileOTP } from '../Components/Home/otpService';
import axios from 'axios';

const checkAccessTime = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 10 && currentHour <= 13;
};

export const handleLogin = async (email, phoneNumber) => {
    const userDetails = await getUserDetails();

    // Store user login details in your database
    await axios.post('https://internshipbackend-vwja.onrender.com/api/store-login-details', userDetails);

    if (userDetails.deviceType === 'mobile' && !checkAccessTime()) {
        alert('Access is only allowed between 10 AM and 1 PM on mobile devices.');
        return;
    }

    if (userDetails.browser === 'Chrome') {
        await sendEmailOTP(email);
        // Handle OTP verification
    } else if (userDetails.browser === 'Microsoft Edge') {
        // Allow access without authentication
        console.log('Access allowed without authentication for Microsoft Edge');
    } else {
        // Default case
        alert('Access denied. Unsupported browser.');
    }
};
