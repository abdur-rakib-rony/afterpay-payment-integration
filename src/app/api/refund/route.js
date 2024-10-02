import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { orderId, amount, reason } = await request.json();
    const response = await axios.post(
      `${process.env.AFTERPAY_API_URL}/v2/payments/${orderId}/refund`,
      { amount, reason },
      {
        auth: {
          username: process.env.AFTERPAY_MERCHANT_ID,
          password: process.env.AFTERPAY_SECRET_KEY,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error processing refund:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Error processing Afterpay refund' }, { status: 500 });
  }
}