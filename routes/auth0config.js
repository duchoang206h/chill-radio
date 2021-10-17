const router = require("express").Router();
const config = require("../configs/config");
// Config for Auth0 client
router.get("/", (req, res) => {
  const response = {
    domain: config.AUTH0_DOMAIN,
    client_id: config.AUTH0_CLIENT_ID,
  };
  res.status(200).json(response);
});
module.exports = router;
