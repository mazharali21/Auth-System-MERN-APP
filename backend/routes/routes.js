const express = require("express");
const { registerUser, verification } = require("../controllers/userController");
const {loginUser} = require("../controllers/loginUser");
const { forgotPassword } = require("../controllers/forgotPassword");
const {changePassword} = require("../controllers/resetPassword")


const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verification);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", changePassword);


module.exports = { router };
