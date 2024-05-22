const jwt = require("jsonwebtoken");

const createTokenForUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
    name: user.name,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const validateToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  createTokenForUser,
  validateToken,
};
