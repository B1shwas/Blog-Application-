const express = require("express");

const {
  getLoginPage,
  getSignUpPage,
  userSignUp,
  userLogin,
  userLogout,
} = require("../controllers/user.controllers");

const router = express.Router();

router.get("/login", getLoginPage);

router.get("/signup", getSignUpPage);

router.post("/signup", userSignUp);

router.post("/login", userLogin);

router.get("/logout", userLogout);

module.exports = router;
