const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require("../../config")

router.post('/register', async (req, res, next) => {
    passport.authenticate('register', { session: false }, async (err, user, info) => {
        if (err) {
            return res.status(400).json({
                status: "failure",
                message: err.message
            });
        }
        return res.json({
            status: "success",
            message: info,
            user: user
        });
    }
    )(req, res, next);
}
);

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                return res.status(400).json({
                    status: "failure",
                    message: info
                });
            }

            req.login(user, { session: false }, async (error) => {
                if (error) {
                    return res.status(400).json({
                        status: "failure",
                        message: info
                    });
                }

                const body = {
                    user_id: user._id,
                    username: user.username
                };
                const auth_token = jwt.sign({ user: body }, config.auth_secret, { expiresIn: '180d' });

                return res.json({
                    status: "success",
                    message: info,
                    auth_token: auth_token
                });
            });
        } catch (error) {
            return res.status(400).json({
                status: "failure",
                message: info
            });
        }
    }
    )(req, res, next);
}
);


module.exports = router;