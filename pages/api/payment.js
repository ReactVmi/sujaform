// pages/api/charge.js
import stripe  from '../../utils/stripe'; // Import your Stripe instance or configuration

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Return a 405 error if the request method is not allowed
    return;
  }

  const { paymentMethodId, amount } = req.body;

  console.log("TESTING BACKEND");

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethodId,
      amount,
      currency: 'gbp', // Replace with your desired currency
      confirm: true,
      description:`Suja Online Booking`
    });

    res.status(200).json({ paymentId: paymentIntent.id, status: paymentIntent.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the payment.', error });
  }
}