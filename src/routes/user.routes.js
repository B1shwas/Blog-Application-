const express = require("express");

const {
  getLoginPage,
  getSignUpPage,
  userSignUp,
  userLogin,
} = require("../controllers/user.controllers");

const router = express.Router();

router.get("/login", getLoginPage);

router.get("/signup", getSignUpPage);

router.post("/signup", userSignUp);

router.post("/login", userLogin);

module.exports = router;
