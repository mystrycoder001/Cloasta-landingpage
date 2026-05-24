const Razorpay = require('razorpay');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  
  if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan_tier, email, user_id } = req.body;
  if (!plan_tier || (!email && !user_id)) {
      return res.status(400).json({ error: 'Missing plan_tier, email, or user_id' });
  }

  // Pro Lifetime Access at ₹2,499 INR (249900 paise)
  let amount;
  let currency = 'INR';

  if (plan_tier === 'pro') {
      amount = 249900; // ₹2,499 INR
  } else if (plan_tier === 'ultra') {
      amount = 1599; // $15.99 USD (in cents)
      currency = 'USD';
  } else {
      return res.status(400).json({ error: 'Invalid plan tier. Use "pro" or "ultra".' });
  }

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
      console.error('Missing RAZORPAY_KEY_ID or RAZORPAY_SECRET');
      return res.status(500).json({ error: 'Payment service unavailable. Please try again later.' });
  }

  try {
      const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_SECRET
      });

      const identifier = email || user_id || 'guest';
      const safeIdentifier = identifier.replace(/[^a-zA-Z0-9]/g, '').substring(0, 15);
      const options = {
          amount: amount, 
          currency: currency,
          receipt: `receipt_${safeIdentifier}_${Date.now()}`,
          notes: {
              email: email || '',
              user_id: user_id || '',
              plan_tier: plan_tier
          }
      };

      const order = await razorpay.orders.create(options);
      
      return res.status(200).json({ 
          order_id: order.id, 
          amount: order.amount,
          currency: order.currency,
          key_id: process.env.RAZORPAY_KEY_ID,
          plan_tier: plan_tier
      });
  } catch (err) {
      console.error('create-order error:', err);
      return res.status(500).json({ error: 'Payment initialization failed. Please try again.' });
  }
};
