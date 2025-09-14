const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { remove } = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const user = require("../controllers/user");

router
  .route("/register")
  .get(user.renderRegister)
  .post(catchAsync(user.register));

router
  .route("/login")
  .get(user.renderLogin)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    user.login
  );

router.get("/logout", user.logout);

module.exports = router;
