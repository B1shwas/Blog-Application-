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
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", {
      error: "Incorrect password or email",
    });
  }
};

const userLogout = (req, res) => {
  return res.clearCookie("token").redirect("/");
};

module.exports = {
  getLoginPage,
  getSignUpPage,
  userSignUp,
  userLogin,
  userLogout,
};
