const User = require("../models/user.model");

const getLoginPage = (req, res) => res.render("login");

const getSignUpPage = (req, res) => res.render("signup");

const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.matchPassword(email, password);
  console.log("User", user);
  return res.redirect("/");
};

module.exports = {
  getLoginPage,
  getSignUpPage,
  userSignUp,
  userLogin,
};
