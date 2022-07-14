const emailsRouter = require("express").Router();
const nodemailer = require("nodemailer");

emailsRouter.post("/", async (req, res, next) => {
  let body = req.body;

  let mailOptions = {
    ...body,
    from: process.env.GMAIL_USR
  };

  console.log(mailOptions);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.GMAIL_USR,
      pass: process.env.GMAIL_PWD
    }
  });

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200);
  }
  catch (error) {
    next(error);
  }
});

module.exports = emailsRouter;