// src/utils/storeLoginDetails.js
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

const storeLoginDetails = async (userDetails) => {
  try {
    const docRef = await addDoc(collection(db, 'loginHistory'), userDetails);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export default storeLoginDetails;
