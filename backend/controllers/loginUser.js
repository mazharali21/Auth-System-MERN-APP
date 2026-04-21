const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    if(user.isVerfied !== true){
      return res.status(403).json({
        success : false,
        message : "Verify Your Account"
      })
    }

    const existingSchema = await Session.findOne({userId : user._id})

    if(existingSchema){
      await Session.deleteOne({userId: user._id});
    }
    
    // Create Session
    await Session.create({userId : user._id});

    // Generate Tokens
    const accessToken = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn : "10d"})
    const refreshToken = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn : "30d"})

    user.isLoggedIn = true;

    await user.save();

    return res.status(200).json({
      success : true,
      message : `Welcome back ${user.username}`,
      accessToken,
      refreshToken,
      data : user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {loginUser};