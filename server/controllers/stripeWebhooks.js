import Stripe from 'stripe';
import Booking from "../models/Booking.js";

export const stripeWebhooks = async (request, response) => {
  // Stripe requires the raw body for signature verification; ensure express.raw middleware is used on this route.
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    console.error("Stripe webhook secrets are not configured");
    return response.status(500).send("Stripe webhook not configured");
  }

  let stripeInstance;
  try {
    stripeInstance = new Stripe(secretKey, { apiVersion: '2022-11-15' });
  } catch (err) {
    console.error("Stripe init error:", err);
    return response.status(500).send("Stripe init failed");
  }

  const sig = request.headers['stripe-signature'];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(request.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const paymentIntentId = paymentIntent.id;

    // Fetch the checkout session to get metadata
    const sessions = await stripeInstance.checkout.sessions.list({
      payment_intent: paymentIntentId,
      limit: 1,
    });

    const session = sessions.data[0];
    if (session && session.metadata && session.metadata.bookingId) {
      const bookingId = session.metadata.bookingId;
      await Booking.findByIdAndUpdate(bookingId, { isPaid: true, paymentMethod: 'Stripe' });
    } else {
      console.warn("No bookingId metadata found on session for payment_intent:", paymentIntentId);
    }
  } else {
    console.log("Unhandled event type:", event.type);
  }

  response.json({ received: true });
};