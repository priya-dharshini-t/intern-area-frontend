import { auth } from '../../firebase/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import React, { useState, useEffect } from 'react';

export const setupRecaptcha = (containerId) => {
    window.recaptchaVerifier = new RecaptchaVerifier(
        containerId, 
        {
            size: "invisible",
            callback: (response) => {
                console.log("Recaptcha verified");
            },
            'expired-callback': () => {
                console.log("Recaptcha expired");
            }
        },
        auth
    );
};

export const sendMobileOTP = async (phoneNumber) => {
    if (!window.recaptchaVerifier) {
        setupRecaptcha('recaptcha-container');
    }
    try {
        const result = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
        return result.verificationId;
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw error;
    }
};

export const verifyOtp = async (verificationId, otp) => {
    try {
        const credential = PhoneAuthProvider.credential(verificationId, otp);
        await signInWithCredential(auth, credential);
        console.log("Successfully signed in with OTP");
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw error;
    }
};

// Placeholder for sendEmailOTP if needed
export const sendEmailOTP = async (email) => {
    // Add your email OTP sending logic here
};
