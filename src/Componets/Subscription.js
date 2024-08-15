import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your-publishable-key-here');

const plans = [
  { id: 'free', name: 'Free Plan', price: 0, applications: 1 },
  { id: 'bronze', name: 'Bronze Plan', price: 100, applications: 3 },
  { id: 'silver', name: 'Silver Plan', price: 300, applications: 5 },
  { id: 'gold', name: 'Gold Plan', price: 1000, applications: 'Unlimited' },
];

const SubscriptionForm = () => {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      return;
    }

    const response = await axios.post('/api/create-subscription', {
      paymentMethodId: paymentMethod.id,
      plan: selectedPlan.id,
    });

    if (response.data.error) {
      setError(response.data.error.message);
      return;
    }

    // Handle subscription completion and email sending here
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={selectedPlan.id} onChange={(e) => setSelectedPlan(plans.find(plan => plan.id === e.target.value))}>
        {plans.map(plan => (
          <option key={plan.id} value={plan.id}>{plan.name} - ₹{plan.price}/month</option>
        ))}
      </select>
      <CardElement />
      <button type="submit" disabled={!stripe}>Subscribe</button>
      {error && <div>{error}</div>}
    </form>
  );
};

const Subscription = () => (
  <Elements stripe={stripePromise}>
    <SubscriptionForm />
  </Elements>
);

export default Subscription;
