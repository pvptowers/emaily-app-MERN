const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("thanks for voting");
  });

  //Check if user is logged in and they have enough credits using middleware
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({
        email: email.trim()
      })),
      _user: req.user.id,
      dateSend: Date.now()
    });
    //Great place to send an email, second argument passes in the html to use in the body of the email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      //save survey to database
      await survey.save();
      //remove credit from user
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422);
    }
  });
};
