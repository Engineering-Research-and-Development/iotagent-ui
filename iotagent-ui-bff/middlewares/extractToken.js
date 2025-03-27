const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    const token = bearerToken.split(" ");

    const tokenData = jwt.decode(token[1]);

    req.tokenData = tokenData;

    next();
  } catch (error) {
    next(error);
  }
}
