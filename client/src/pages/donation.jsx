import React, { useEffect } from 'react';
import qrcode from '../assets/qrcode.jpeg'; 

const DonateUs = () => {
  useEffect(() => {
    // Load the PayPal script dynamically
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=ATbGPXZyU6jglTfjjQgAUTiALsaytihOsdHzfUgwhcKAa8A3pr1pkAMSCRxUSnoe9J5EI41zKzM5LGuG'; // Replace with your PayPal client ID
    script.async = true;
    script.onload = () => {
      console.log('PayPal script loaded');
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            console.log('Creating order');
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: '50.00', // Donation amount
                },
              }],
            });
          },
          onApprove: async (data, actions) => {
            console.log('Order approved');
            await actions.order.capture();
            alert('Thank you for your donation!');
          },
          onError: (err) => {
            console.error('Error with PayPal:', err);
            alert('There was an error with your donation. Please try again.');
          },
        }).render('#paypal-button-container');
      } else {
        console.error('PayPal SDK not available');
      }
    };
    script.onerror = () => {
      console.error('Failed to load PayPal script');
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className='flex-1 relative'>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Support Our Cause</h1>
        <p className="text-gray-600 text-center mb-6">
          Scan the QR code below to make a donation. Your support is greatly appreciated!
        </p>
        <div className="flex justify-center mb-4">
          <img
            src={qrcode}
            alt="Donate QR Code"
            className="w-48 h-48"
          />
        </div>
        <div id="paypal-button-container" className="w-full text-center mt-4"></div>
      </div>
    </div>
    </div>
  );
};

export default DonateUs;