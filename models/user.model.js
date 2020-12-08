const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const {
  encryptPassword,
  comparePassword,
} = require("../utils/encryptPassword");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
    },
    lastName: {
      type: String,
      minlength: 1,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    encryptPassword: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      trim: true,
      default:''
    },
    promotion: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      maxlength: 6,
      minlength: 6,
      trim: true,
    },
    otpCreatedAt: {
      type: Date,
      default: Date,
    },
    isGoogle: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    roleId: {
      type: Number,
      enum: [1, 2, 3],
      default:3
    },
    follower: {
      type: [
        {
          type: ObjectId,
          ref: "User",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("password").set(function (password) {
  this.encryptPassword = encryptPassword(password);
});

userSchema.methods = {
  authenticatePassword: function (plainTextPassword) {
    return comparePassword(plainTextPassword, this.encryptPassword);
  },
  authenticateUser: function (otp) {
    if (new Date() - new Date(this.otpCreatedAt) <= 300000) {
      if (otp === this.otp) {
        return "OTP verified";
      } else {
        return "Invalid OTP";
      }
    } else return "OTP expired please enter within 5 minute";
  },
};

module.exports = mongoose.model("User", userSchema);
