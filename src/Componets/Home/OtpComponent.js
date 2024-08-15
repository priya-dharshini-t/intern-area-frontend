import React, { useState } from 'react';
import { setupRecaptcha, sendMobileOTP, verifyOtp } from './otpService'; // Ensure correct import path

const OtpComponent = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationId, setVerificationId] = useState('');

    const handleSendOTP = () => {
        sendMobileOTP(phoneNumber)
            .then((id) => {
                setVerificationId(id);
                console.log('OTP sent');
            })
            .catch((error) => {
                console.error('Error sending OTP', error);
            });
    };

    const handleVerifyOTP = () => {
        verifyOtp(verificationId, otp)
            .then(() => {
                console.log('OTP verified');
            })
            .catch((error) => {
                console.error('Error verifying OTP', error);
            });
    };

    return (
        <div>
            <div id="recaptcha-container"></div>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
            />
            <button onClick={handleSendOTP}>Send OTP</button>

            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
            />
            <button onClick={handleVerifyOTP}>Verify OTP</button>
        </div>
    );
};

export default OtpComponent;




