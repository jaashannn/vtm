const express = require("express");
const {
  createAgent,
  createClientByAgent,
  registerClient,
  loginUser,
  sendOtpOnEmail,
  verifyOtp,
  subscribeClient,
  registerAdmin,
  getClientsForAdmin,
  getAgentsForAdmin,
  verifyAgents,
  getDocsOfAgent,
  getLogoOfClient,
  getAgentsClient,
  getClientActiveSubscriptionDetails,
  getClientAllSubscriptionDetails,
  getAllUserCards,
  cancelSubscription,
  getAgentOwnDetails,
  searchAgentClient,
  logoutUser,
} = require("../Controllers/userController");
const { uploadDocs } = require("../Middlewares/uploadDocs");
const { authMiddleware } = require("../Middlewares/authMiddleware");
const { uploadImage } = require("../Middlewares/uploadImages");
const router = express.Router();
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size should be less than 5MB.",
      });
    }
  } else if (err) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
  next();
};

// register admin
router.post("/register/admin", registerAdmin);
// register agent
router.post("/register/agent", uploadDocs, handleMulterError, createAgent);

// create client by agent
router.post(
  "/agent/create/client",
  authMiddleware(["agent"]),
  uploadImage,
  handleMulterError,
  createClientByAgent
);

// register client by self
router.post(
  "/register/masterclient",
  uploadImage,
  handleMulterError,
  registerClient
);
// login agent
router.post("/login", loginUser);

// Get logo of company
router.get(
  "/client/logo/:clientId",
  authMiddleware(["admin", "agent", "masterclient"]),
  getLogoOfClient
);
// Get clients of Agent
router.get("/agent/clients", authMiddleware(["agent"]), getAgentsClient);

// Get all clients for admin

router.get("/admin/clients", authMiddleware(["admin"]), getClientsForAdmin);

// Get all agents for admin
router.get("/admin/agents", authMiddleware(["admin"]), getAgentsForAdmin);

// verify agents by admin
router.post("/admin/verify/:agentid", authMiddleware(["admin"]), verifyAgents);

// get docs of agents to admin
router.get("/admin/docs/:agentid", authMiddleware(["admin"]), getDocsOfAgent);

// get active subscription details of client
router.get(
  "/subscription/active/:clientId",
  authMiddleware(["admin", "agent", "masterclient"]),
  getClientActiveSubscriptionDetails
);

// get all subscription details of client
router.get(
  "/subscription/all/:clientId",
  authMiddleware(["admin", "agent", "masterclient"]),
  getClientAllSubscriptionDetails
);

// get card details
router.get(
  "/payment-methods/:clientId",
  authMiddleware(["admin", "agent", "masterclient"]),
  getAllUserCards
);

// cancel subscription of client
router.patch(
  "/cancel-subscription/:clientId",
  authMiddleware(["admin", "agent", "masterclient"]),
  cancelSubscription
);
router.get(
  "/agent",
  authMiddleware(["admin", "agent", "masterclient"]),
  getAgentOwnDetails
);
router.post("/logout", authMiddleware(["admin", "agent", "masterclient"]),logoutUser)
module.exports = router;
