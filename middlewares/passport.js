const passport = require("passport");
const {
  GoogleStrategy,
  GithubStrategy,
  FacebookStrategy,
} = require("./PassportStrategies");
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(GoogleStrategy);
passport.use(GithubStrategy);
passport.use(FacebookStrategy);
module.exports = passport;
