const User = require("../models/userModel.js");
const crypto = require("crypto");
const resetPassword = require('../forgotPassword/resetPassword.js')

const forgotPassword = async (req, res) => {
  try {

    const { email }  = req.body;

    if(!email) {
        return res.status(400).json({
            success : false,
            message : "Email is required"
        })
    }

    // const lowercaseEmail = email.toLowerCase();

    const existingUser = await User.findOne({email});

    if(!existingUser){
        return res.status(400).json({
            success : false,
            message : "If the email exists, a reset link has been sent."
        })
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashToken = crypto.createHash("sha256").update(resetToken).digest('hex')

    existingUser.resetPasswordToken = hashToken;
    existingUser.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await existingUser.save();

    await resetPassword(email, resetToken);

    return res.status(200).json({
        success : true,
        message : "Reset Link Sent To Your Email Successfully",
        data : existingUser, 
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {forgotPassword}