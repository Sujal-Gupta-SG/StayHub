express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapasync = require("../utils/wrapasync.js");
const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.renderSignupFrom)
  .post( wrapasync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// router.get("/signup", userController.renderSignupFrom);

// router.post("/signup", wrapasync(userController.signup));

// router.get("/login", userController.renderLoginForm);

// router.post(
//   "/login",
//   savedRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   userController.login
// );

router.get("/logout", userController.logout);

module.exports = router;
