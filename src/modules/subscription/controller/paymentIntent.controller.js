
const paymentIntent = async (req, res) => {
    let { amount, subscriptionType } = req.body;

    try {
        if (!amount || !subscriptionType) {
            return res.status(400).json({ message: 'Amount and subscription type are required' });
        }

        if (!['monthly', 'yearly'].includes(subscriptionType)) {
            return res.status(400).json({ message: 'Invalid subscription type' });
        }

        if (subscriptionType === 'yearly') {
            amount = amount * 12; // Multiply the amount by 12 for yearly subscription
        }

        // Create a payment intent with Stripe
        const stripe = require('stripe')(process.env.SECRET_KEY);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur', // it was usd
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = paymentIntent;