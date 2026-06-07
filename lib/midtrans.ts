// @ts-ignore
import midtransClient from 'midtrans-client';

// Determine if we are in production
// By default, for development we use Sandbox unless NEXT_PUBLIC_MIDTRANS_ENV is 'production'
const isProduction = process.env.NEXT_PUBLIC_MIDTRANS_ENV === 'production';

// Initialize Snap API for generating Snap Tokens
export const snap = new midtransClient.Snap({
  isProduction: isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY || '',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || '',
});

// Initialize Core API for backend checks (status, refund, etc)
export const coreApi = new midtransClient.CoreApi({
  isProduction: isProduction,
  serverKey: process.env.MIDTRANS_SERVER_KEY || '',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || '',
});
