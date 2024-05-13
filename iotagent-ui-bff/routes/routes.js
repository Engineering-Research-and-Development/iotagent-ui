const express = require('express');
const router = express.Router();
const passport = require('passport');

require('../auth');

const routes = require('./basic_routes');
const secureRoutes = require('./secure_routes');

router.use('/basic', routes);
router.use('/auth',
    passport.authenticate('jwt', { session: false }),
    secureRoutes
);

module.exports = router;