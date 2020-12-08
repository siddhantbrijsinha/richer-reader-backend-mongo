const sendResponse = require("../../utils/sendResponse");
const { generateToken, getTokenDetails } = require("../../utils/auth");
const User = require("../../models/user.model");
const { sendMail } = require("../../utils/mailer");
const { generateOtp } = require("../../utils/helper/common");

const sendVerificationMail = (email, name, otp) => {
  sendMail(
    email,
    "Welcome to Richer Readers",
    `welcome aborard ${name}. Your OTP is ${otp}`
  );
};

const signUp = async (req, res) => {
  const { firstName, lastName, email, password, promotion } = req.body;

  try {
    const isUserPresent = await User.findOne({ email }, {});
    if (isUserPresent) {
      return sendResponse(res, 400, {}, "User is already registered! Please Login or click on Forget Password to Reset Your Password");
    }
    const otp = generateOtp();
    await User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      promotion,
      otp,
    }).save();

    sendVerificationMail(email, firstName, otp);

    sendResponse(
      res,
      200,
      {},
      "User has been successfully registered.Please verify your account."
    );
  } catch (error) {
    return sendResponse(res, 400, {}, "Something went wrong ,Please try again");
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await User.findOne({ email });

    if (!userData) {
      return sendResponse(res, 400, {}, "You are not Yet Registered to Richer Readers. Please Register Yourself by clicking on SignUp Link.");
    }

    if (!userData.isVerified) {
      return sendResponse(res, 400, {}, "Your Account is not Verified! Please verify your account to proceed Further");
    }

    if (!userData.authenticatePassword(password)) {
      return sendResponse(res, 400, {}, "Authentication Failed! Please enter correct password");
    }

    const token = generateToken({ uid: userData._id });

    sendResponse(res, 200, {
      token,
      _id: userData._id,
      email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      profileImage: userData.profileImage,
      roleId: userData.roleId,
    });
  } catch (error) {
    console.log(error.message);
    return sendResponse(res, 400, {}, "Something went wrong ,Please try again");
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const userData = await User.findOne({ email });

    if (!userData) {
      return sendResponse(res, 400, {}, "No user was found");
    }

    const result = userData.authenticateUser(otp);

    if (result !== "OTP verified") {
      return sendResponse(res, 400, {}, result);
    }

    userData.isVerified = true;
    await userData.save();

    return sendResponse(res, 201, {}, "Success!! Verification Successful");
  } catch (error) {
    logger.error(error);
    return sendResponse(res, 400, {}, error.message);
  }
};

module.exports = {
  signUp,
  signIn,
  verifyEmail,
};
