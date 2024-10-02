import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { orderId } = await request.json();
    const response = await axios.post(
      `${process.env.AFTERPAY_API_URL}/v2/payments/capture`,
      { orderId },
      {
        auth: {
          username: process.env.AFTERPAY_MERCHANT_ID,
          password: process.env.AFTERPAY_SECRET_KEY,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error capturing payment:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Error capturing Afterpay payment' }, { status: 500 });
  }
}