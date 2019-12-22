const passport = require("passport");

module.exports = app => {
  //Route Handler for Google Straetgy
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  //Router handler for Google callback
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};