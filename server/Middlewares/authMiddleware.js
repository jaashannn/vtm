const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../Models/userModel");
const ClientModel = require("../Models/clientModel");
const { isTokenBlacklisted } = require("./tokenBlacklist");
dotenv.config();

const authMiddleware = (role) => async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }
    if(isTokenBlacklisted(authorizationHeader)){
      return res.status(401).json({
        success: false,
        message:"Token has been invalidated. Please log in again."
      })
    };
    const tokenFromHeaders = authorizationHeader.split(" ")[1];
    if (!tokenFromHeaders) {
      return res.status(401).json({
        success: false,
        message: "Token missing, contact please",
      });
    }
    let data;
    try {
      data = jwt.verify(tokenFromHeaders, process.env.JWT_SECRET_KEY);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired, please log in again",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    if (!data || !data.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
    const user = await UserModel.findById(data.id) || await ClientModel.findById(data.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (role.includes(data.role)) {
      req.user = user;
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { authMiddleware };
