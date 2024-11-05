// PaymentGateway.js
import React from 'react';

const PaymentGateway = () => {
  return (
    <div className="container mx-auto text-center p-8">
      <h1 className="text-3xl font-bold mb-4">Dummy Payment Gateway</h1>
      <p className="mb-4">This is a mock payment gateway page for testing purposes only.</p>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Confirm Payment
      </button>
    </div>
  );
};

export default PaymentGateway;
