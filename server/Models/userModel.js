const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: {
        email: {
          type: String,
          require: true,
        },
        verified: {
          type: Boolean,
          require: false,
          default: false,
        },
      },
      require: true,
      unique: true,
    },
    phoneNumber: {
      type: {
        phoneNumber: {
          type: String,
          require: true,
        },
        verified: {
          type: Boolean,
          require: false,
          default: false,
        },
      },
      require: false,
    },
    country: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    province: {
      type: String,
      require: true,
    },
    postalCode: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: false,
      default: "agent",
    },
    otp: {
      type: Number,
      require: false,
    },
    otpCreatedAt: {
      type: Date,
      require: false,
    },
    sinNumber: {
      type: String,
      require: true,
    },
    bankAccountDetails: {
      type: {
        bankName: {
          type: String,
          require: true,
        },
        ifscCode: {
          type: String,
          require: true,
        },
        accountHolderName: {
          type: String,
          require: true,
        },
      },
      require: true,
    },
    verifiedIdDocuments: [
      {
        docName: {
          type: String,
          require: true,
        },
        docPath: {
          type: String,
          require: true,
        },
        verified: {
          type: Boolean,
          require: false,
          default: false,
        },
      },
    ],
    companyWebsite: {
      type: String,
      require: false,
    },
    token: {
      type: String,
      require: false,
    },
    clients: {
      type: [mongoose.Schema.Types.ObjectId],
      require: false,
      ref: "clients",
    },
    verified: {
      type: Boolean,
      require: false,
      default: false,
    },
    password: {
      type: String,
      require: true,
    },
    totalCommissionMade:{
      type: Number,
      require: false,
      default: 0
    },
    paidCommission:{
      type:Number,
      require: false,
      default: 0
    },
    
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (this.otp && this.otpCreatedAt) {
    const currentTime = Date.now();
    const otpAge = (currentTime - this.otpCreatedAt.getTime()) / (60 * 1000); // Calculate age in minutes
    if (otpAge > 12) {
      this.otp = null;
      this.otpCreatedAt = null;
    }
  }
  next();
});
userSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  }
  next();
});
const UserModel = mongoose.model("agents", userSchema);
module.exports = UserModel;
