const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

// exports to index.js , app argument is express app from index
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      source: req.body.id,
      description: '5$ for 5 credits'
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
