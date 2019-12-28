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
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );
  //Get Current Logged in user
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
  app.get("/api/logout", (req, res) => {
    //req.logout is available from passport
    req.logout();
    //Get back req.user, as they are loggedout it should come back undefined or empty.
    res.redirect("/");
  });
};
