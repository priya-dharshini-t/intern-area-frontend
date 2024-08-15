// src/utils/checkAccessTime.js
const checkAccessTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
  
    return currentHour >= 10 && currentHour <= 13;
  };
  
  export default checkAccessTime;
  