const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");
const crypto = require("crypto");


const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const token  = req.params.token;

    if (!password || password.length <= 8) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const hashToken = crypto.createHash("sha256").update(token).digest('hex')
    
    const user = await User.findOne({resetPasswordToken : hashToken })

    if(!user){
         return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const newHashedPassword = await bcrypt.hash(password, 10);

    console.log(token)

    if(Date.now() > user.resetPasswordExpire){
        return res.status(401).json({
            success : false,
            message : "Time Expired"
        })
    }

    user.password = newHashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null ;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { changePassword };
