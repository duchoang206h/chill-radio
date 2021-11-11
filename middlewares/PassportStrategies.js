const { github, google, facebook } = require("../configs/oauth");
const Google = require("passport-google-oauth2").Strategy;
const Github = require("passport-github2").Strategy;
const Facebook = require("passport-facebook").Strategy;
const GoogleStrategy = new Google(
  {
    clientID: google.client_id,
    clientSecret: google.client_secret,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
);
const GithubStrategy = new Github(
  {
    clientID: github.client_id,
    clientSecret: github.client_secret,
    callbackURL: "http://localhost:3000/auth/github/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
);
const FacebookStrategy = new Facebook(
  {
    clientID: facebook.client_id,
    clientSecret: facebook.client_secret,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
);
module.exports = {
  GoogleStrategy,
  GithubStrategy,
  FacebookStrategy,
};
