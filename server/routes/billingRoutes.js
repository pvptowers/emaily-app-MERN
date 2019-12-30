const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");
//Hanlde token from Stripe
//Then use token to validate charge with stripe
module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id
    });
    //Get user model and add $5 for thier credits
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
