require("dotenv").config();
module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  YOUTUBE_KEY: process.env.YOUTUBE_KEY,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  JWT_SECRET: process.env.JWT_SECRET,
  TWOFA_SECRET: process.env.TWOFA_SECRET,
  BCRYPT_SECRET:process.env.BCRYPT_SECRET
};
