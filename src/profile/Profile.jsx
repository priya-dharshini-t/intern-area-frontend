import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../Feature/Userslice';  // Ensure correct path
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginHistory from '../Componets/LoginHistory';  // Ensure correct path

function Profile() {
  const user = useSelector(selectUser);
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const savedImage = localStorage.getItem('selectedImage');
    if (savedImage) {
      setSelectedImage(savedImage);
    } else {
      setSelectedImage(user?.photo || '');
    }
    fetchAvatars();
  }, [user?.photo]);

  const fetchAvatars = () => {
    const avatarArray = [];
    for (let i = 1; i <= 5; i++) {
      avatarArray.push(`https://robohash.org/${user?.uid}?set=set${i}`);
    }
    setAvatars(avatarArray);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        localStorage.setItem('selectedImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (avatarUrl) => {
    setSelectedImage(avatarUrl);
    localStorage.setItem('selectedImage', avatarUrl);
  };

  return (
    <div>
      <div className="flex items-center mt-9 mb-4 justify-center">
        <div className="max-w-xs">
          <div className="bg-white shadow-lg rounded-lg py-3">
            <label htmlFor="imageUpload" className="block text-center text-blue-600 cursor-pointer hover:underline">{t('edit_picture')}</label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="photo-wrapper p-2">
              <img
                src={selectedImage || 'https://via.placeholder.com/150'}  // Placeholder image if none selected
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto"
              />
            </div>
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900">{user?.name}</h3>
            </div>
            <div className="text-xs my-3">
              <h3 className="text-xl font-bold">{t('uid')}</h3>
              <h3 className="text-center text-lg text-gray-900">{user?.uid}</h3>
            </div>
            <div>
              <h3 className="text-xl font-bold">{t('email')}</h3>
              <h3 className="text-center text-xl text-gray-900">{user?.email}</h3>
            </div>
            <div className="flex justify-center mt-3">
              <Link
                to="/userapplication"
                className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group"
              >
                <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">
                  {t('view_applications')}
                </span>
              </Link>
            </div>
            <div className="flex justify-center mt-3">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index}`}
                  className="w-8 h-8 rounded-full cursor-pointer mx-1 border border-gray-300"
                  onClick={() => handleAvatarSelect(avatar)}
                />
              ))}
            </div>
          </div>
          <div className="mt-5">
            <h2 className="text-xl font-bold mb-3">{t('login_history')}</h2>
            <LoginHistory userId={user?.uid} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

