const { validateToken } = require("../utils/authentication");

const checkForAuthenticationCookie = (cookie) => {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookie];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {}
    return next();
  };
};

module.exports = { checkForAuthenticationCookie };
