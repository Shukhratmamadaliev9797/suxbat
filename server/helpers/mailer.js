const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";

//destructure dotenv
const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH, MAILING_ACCESS } =
  process.env;

//new OAuth
const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

//sending verification email
exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Suxbat email verification",
    html: `<div style="width:90%;margin:0 auto;font-family:'Lucida Sans','Lucida Sans Regular','Lucida Grande','Lucida Sans Unicode',Geneva,Verdana,sans-serif"><div style="display:flex;align-items:center;border-bottom:1px solid #ddd;margin-bottom:20px;padding:10px"><img src="https://res.cloudinary.com/dbusuq5am/image/upload/v1667588029/upload/images/icon5_da1j1k.png" alt="logo" width="70" height="60"><span style="font-weight:700;font-size:20px;color:#038eaa">Action Require: Activate your suxbat account</span></div><div style="padding:10px;color:#626060"><div style="font-size:17px;margin-bottom:20px">Hello ${name}</div><div style="margin-bottom:5px">Thanks for getting started with our suxbat!</div><div style="margin-bottom:15px">We need a little more information to complete your registration, including a confirmation of your email address.</div><div style="margin-bottom:20px">Click below to confirm your email address:</div><div style="margin-bottom:35px;margin-top:35px"><a style="background:#038eaa;color:#fff;padding:10px;font-size:15px;border:none;border-radius:5px;text-decoration:none" href="${url}">Verify your email</a></div><div style="margin-bottom:25px">This link will verify your email address, and then you’ll officially be a part of the suxbat community.</div><div>See you there!<span style="display:block;margin-top:15px">Best regards, the suxbat team</span></div></div></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};

exports.sendResetCode = (email, name, code) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Suxbat Password Reset",
    html: `<div style="width:90%;margin:0 auto;font-family:'Lucida Sans','Lucida Sans Regular','Lucida Grande','Lucida Sans Unicode',Geneva,Verdana,sans-serif"><div style="display:flex;align-items:center;border-bottom:1px solid #ddd;margin-bottom:20px;padding:10px"><img src="https://res.cloudinary.com/djdbhmqqd/image/upload/v1709513595/Assests/logo1_i7fbut.png" alt="logo" width="80"><span style="font-weight:700;font-size:20px;color:#6f94f9">Reset your password</span></div><div style="padding:10px;color:#626060"><div style="font-size:17px;margin-bottom:20px">Hello ${name}</div><div style="margin-bottom:5px">Someone tried to reset password</div><div style="margin-bottom:15px">If this was you, please use the following code to reset your password</div><div style="margin-bottom:20px">Here is the code:</div><div style="margin-bottom:35px;margin-top:35px"><a style="background:#2f54eb;color:#fff;padding:10px;font-size:15px;border:none;border-radius:5px;text-decoration:none">${code}</a></div><div style="margin-bottom:25px">If this wasn't you, please contact use immediatly</div><div><span style="display:block;margin-top:15px">Best regards, the suxbat team</span></div></div></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
