import React, { useState } from 'react';

const generateCoupon = () => {
  return 'COUPON-' + Math.random().toString(36).substring(2, 10).toUpperCase();
};

const Coupon = ({ applyCoupon }) => {
  const [coupon, setCoupon] = useState(generateCoupon());
  const [discount, setDiscount] = useState(0);

  const handleDiscountChange = (e) => {
    setDiscount(parseInt(e.target.value));
  };

  const handleApplyCoupon = () => {
    applyCoupon(discount);
  };

  return (
    <div>
      <h3>Your Coupon: {coupon}</h3>
      <select value={discount} onChange={handleDiscountChange}>
        {[...Array(10).keys()].map(i => (
          <option key={i} value={i + 1}>{i + 1}%</option>
        ))}
      </select>
      <button onClick={handleApplyCoupon}>Apply Coupon</button>
    </div>
  );
};

export default Coupon;
