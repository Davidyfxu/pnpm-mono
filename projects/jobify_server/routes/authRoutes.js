import express from "express";
import {
  login,
  updateUser,
  register,
  getCurrentUser,
  logout,
} from "../controllers/authController.js";
import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message:
    "Too many requests from this IP address, please try again after 15 minutes",
});
const router = express.Router();
import authenticateUser from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";
router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/logout").get(logout);
router.route("/updateUser").patch(authenticateUser, testUser, updateUser);
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);

export default router;
