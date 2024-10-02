import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await axios.post(
      `${process.env.AFTERPAY_API_URL}/v2/checkouts`,
      body,
      {
        auth: {
          username: process.env.AFTERPAY_MERCHANT_ID,
          password: process.env.AFTERPAY_SECRET_KEY,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating Afterpay checkout' }, { status: 500 });
  }
}