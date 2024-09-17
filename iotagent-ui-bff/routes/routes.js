const express = require('express');
const router = express.Router();
const passport = require('passport');

require('../auth');

const routes = require('./basic_routes');
const secureRoutes = require('./secure_routes');
const keycloak = require("../middlewares/keycloak");

router.use('/basic', routes);

if(process.env.KEYCLOAK_URL) {
  router.use('/auth',
    [keycloak.protect()],
    secureRoutes
  );
} else {
  router.use('/auth',
    passport.authenticate('jwt', { session: false }),
    secureRoutes
  );
}

module.exports = router;
