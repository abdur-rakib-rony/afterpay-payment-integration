'use client'

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const createCheckout = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('/api/create-checkout', {
        amount: { amount: "10.00", currency: "AUD" },
        consumer: { 
          phoneNumber: "0400000000",
          givenNames: "Test",
          surname: "Test",
          email: "test@example.com"
        },
        merchant: {
          redirectConfirmUrl: `${window.location.origin}/confirm`,
          redirectCancelUrl: `${window.location.origin}/cancel`
        }
      });
      setCheckoutUrl(response.data.token);
      setOrderId(response.data.orderId);
    } catch (error) {
      console.error('Error creating checkout:', error);
      setMessage('Error creating checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const capturePayment = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('/api/capture-payment', { orderId });
      setMessage(`Payment captured successfully. Payment ID: ${response.data.id}`);
    } catch (error) {
      console.error('Error capturing payment:', error);
      setMessage('Error capturing payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const processRefund = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('/api/refund', {
        orderId,
        amount: { amount: "10.00", currency: "USD" },
        reason: "Customer request"
      });
      setMessage(`Refund processed successfully. Refund ID: ${response.data.refundId}`);
    } catch (error) {
      console.error('Error processing refund:', error);
      setMessage('Error processing refund. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Afterpay Integration Demo</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <p className="mb-4">Total Amount: $10.00 USD</p>
        <button 
          onClick={createCheckout}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mb-4"
        >
          {loading ? 'Processing...' : 'Checkout with Afterpay'}
        </button>
        {checkoutUrl && (
          <p className="mb-4">
            <a 
              href={checkoutUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Complete Afterpay Checkout
            </a>
          </p>
        )}
        {orderId && (
          <>
            <button 
              onClick={capturePayment}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mb-4"
            >
              Capture Payment
            </button>
            <button 
              onClick={processRefund}
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mb-4"
            >
              Process Refund
            </button>
          </>
        )}
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </main>
  );
}