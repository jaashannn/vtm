const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const CardSchema = new mongoose.Schema({
  cardHolderName: {
    type: String, // Name on the card
    require: false,
  },
  cardNumber: {
    type: String, // Card number
    require: false,
  },
  expiryDate: {
    type: String, // Expiry date in MM/YY format
    require: false,
  },
  cardType: {
    type: String, // 'credit' or 'debit'
    require: false,
  },
  isDefault: {
    type: Boolean, // Indicates if this is the default payment method
    default: false,
  },
});

const clientSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      require: true,
    },
    companyLogo: {
      type: String,
      require: true,
    },
    companyAddress: {
      type: String,
      require: true,
    },
    companyCountry: {
      type: String,
      require: true,
    },
    companyPostalCode: {
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
      sparse: true
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
    companyBusinessModelType: {
      type: String,
      require: true,
      default: "small",
    },
    industryOfCompanyOperation: {
      type: String,
      require: true,
    },
    resultRequireForDigitalMarketing: {
      type: String,
      require: false,
    },
    role: {
      type: String,
      require: false,
      default: "client",
    },
    otp: {
      type: Number,
      require: false,
    },
    otpCreatedAt: {
      type: Date,
      require: false,
    },
    stripeCustomerId: {
      type: String,
      require: false,
    },
    paymentMethodId: {
      type: String, // Stripe Payment Method ID used for this subscription
    },
    activeSubscriptionId: {
      type: String,
      require: false,
    },
    cards: {
      type: [CardSchema], // Array of cards
      require: false,
      default: null,
    },
    termAndCoditionsAgreed: {
      type: Boolean,
      require: true,
      default: false,
    },
    token: {
      type: String,
      require: false,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      require: false,
      default: null,
    },
    verified: {
      type: Boolean,
      require: false,
      default: true,
    },
    password: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);
clientSchema.pre("save", function (next) {
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
clientSchema.pre("save", function (next) {
  if (this.isNew && !this.agent && !this.password) {
    return next(new Error("Password is required for Master Clients."));
  }
  if (this.password && (this.isModified("password") || this.isNew)) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});
const ClientModel = mongoose.model("clients", clientSchema);
module.exports = ClientModel;
