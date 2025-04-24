const Stripe = require("stripe");
const dotenv = require("dotenv");
const UserModel = require("../Models/userModel");
const path = require("path");
const fs = require("fs");
const { streamFileUpload } = require("../Middlewares/uploadDocs");
const ClientModel = require("../Models/clientModel");
const { sendOTP } = require("../Middlewares/emailMailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const archiver = require("archiver");
const { addToBlacklist } = require("../Middlewares/tokenBlacklist");
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your actual secret key

// Register Admin
const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({
      success: false,
      message: "Params required",
    });
  }
  try {
    // Check if the email already exists
    const existingUser = await UserModel.findOne({ "email.email": email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const admin = new UserModel({
      email: { email, verified: true },
      password,
      role: "admin",
      verified: true,
    });

    // Save the admin to the database
    await admin.save();

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {}
};
// const parseCardExpiry = (cardExpDate) => {
//   if (!cardExpDate || !/^\d{2}\/\d{2}$/.test(cardExpDate)) {
//     throw new Error("Invalid card expiration date format. Use MM/YY.");
//   }

//   const [expMonth, expYear] = cardExpDate.split("/");

//   return {
//     expMonth: parseInt(expMonth, 10),
//     expYear: parseInt(`20${expYear}`, 10), // Convert YY to YYYY
//   };
// };
const createAgent = async (req, res) => {
  try {
    const {
      name,
      email,
      country,
      address,
      city,
      province,
      postalCode,
      phoneNumber,
      sinNumber,
      bankName,
      bankIfsc,
      bankAccountHolderName,
      verifiedIdDocuments: frontEndDocuments,
      companyWebsite,
      password,
    } = req.body;
    if (
      !name ||
      !email ||
      !country ||
      !address ||
      !city ||
      !province ||
      !postalCode ||
      !phoneNumber ||
      !sinNumber ||
      !bankName ||
      !bankIfsc ||
      !bankAccountHolderName ||
      !password
    ) {
      return res.status(401).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await UserModel.findOne({ "email.email": email });
    // Create a new customer in Stripe
    if (user) {
      res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }
    let verifiedIdDocuments = [];
    if (req.files && req.files.length > 0) {
      const parsedDocuments = JSON.parse(frontEndDocuments);
      verifiedIdDocuments = req.files.map((file, index) => ({
        docName: parsedDocuments[index]?.docName || `Document-${index + 1}`, // Original file name
        docPath: file.path, // File path on server
        verified: false, // Default to false, to be verified later
      }));
    } else {
      return res.status(404).json({
        success: false,
        message: "At least one document (less than 5mb) must be uploaded.",
      });
    }
    const newUser = new UserModel({
      name,
      email: { email, verified: false },
      country,
      address,
      city,
      province,
      postalCode,
      phoneNumber: { phoneNumber, verified: false },
      sinNumber,
      bankAccountDetails: {
        bankName,
        ifscCode: bankIfsc,
        accountHolderName: bankAccountHolderName,
      },
      companyWebsite: companyWebsite || "",
      password,
      verifiedIdDocuments,
      termAndCoditionsAgreed: true,
    });
    // verified documents left to update
    await newUser.save();
    res.json({
      success: true,
      message: "User Registered Successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Down",
    });
  }
};

const createClientByAgent = async (req, res) => {
  const agentId = req.user._id;
  const {
    companyName,
    companyAddress,
    companyCountry,
    postalCode,
    email,
    password,
    phoneNumber, // Optional but good to include
    companyBusinessModelType, // Defaults to "small" if not provided
    industryOfCompanyOperation,
    resultRequireForDigitalMarketing,
  } = req.body;
  try {
    const agent = await UserModel.findById(agentId);
    if (!agent || !agent.verified) {
      res.status(400).json({
        success: false,
        message: "Agent either not exist or not verified.",
      });
    }
    const existingClient = await ClientModel.findOne({ "email.email": email });
    if (existingClient) {
      return res
        .status(400)
        .json({ success: false, message: "Client already exists" });
    }
    const companyLogo = req.file ? req.file.filename : null;
    const stripeCustomer = await stripe.customers.create({
      email,
      name: companyName,
      address: {
        line1: companyAddress,
        postal_code: postalCode,
        country: companyCountry,
      },
      metadata: { createdByAgentId: agentId.toString() },
    });
    const newClient = new ClientModel({
      companyName,
      companyLogo,
      companyAddress,
      companyCountry,
      companyPostalCode: postalCode,
      password,
      phoneNumber: { phoneNumber, verified: false },
      companyBusinessModelType,
      industryOfCompanyOperation,
      resultRequireForDigitalMarketing,
      email: { email, verified: false },
      agent: agent._id,
      stripeCustomerId: stripeCustomer.id,
      termAndCoditionsAgreed: true,
    });

    await newClient.save();

    agent.clients = agent.clients || []; // Ensure clients array exists

    const clientExists = agent.clients.some(
      (clientId) => clientId.toString() === newClient._id.toString()
    );

    if (!clientExists) {
      agent.clients.push(newClient._id);
      await agent.save();
    }

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      result: newClient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Down",
    });
  }
};

const registerClient = async (req, res) => {
  const {
    companyName,
    companyAddress,
    companyCountry,
    companyPostalCode,
    email,
    password,
    phoneNumber, // Optional but good to include
    companyBusinessModelType, // Defaults to "small" if not provided
    industryOfCompanyOperation,
    resultRequireForDigitalMarketing,
  } = req.body;
  try {
    const existingClient = await ClientModel.findOne({ "email.email": email });
    if (existingClient) {
      return res
        .status(403)
        .json({ success: false, message: "Client already exists" });
    }
    const companyLogo = req.file ? req.file.filename : null;
    const stripeCustomer = await stripe.customers.create({
      email,
      name: companyName,
      address: {
        line1: companyAddress,
        postal_code: companyPostalCode,
        country: companyCountry,
      },
      metadata: { createdByAgentId: "admin" },
    });
    const newClient = new ClientModel({
      companyName,
      companyLogo,
      companyAddress,
      companyCountry,
      companyPostalCode,
      password,
      phoneNumber: { phoneNumber, verified: false },
      companyBusinessModelType,
      industryOfCompanyOperation,
      resultRequireForDigitalMarketing,
      role: "masterclient",
      email: { email, verified: false },
      stripeCustomerId: stripeCustomer.id,
      termAndCoditionsAgreed: true,
    });

    await newClient.save();
    res.status(201).json({
      success: true,
      message: "Client created successfully",
      result: newClient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Down",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const id = req.body.email;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Email Required",
      });
    }
    const user =
      (await UserModel.findOne({ "email.email": id })) ||
      (await ClientModel.findOne({ "email.email": id }));
    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    if (!user.verified) {
      return res.status(401).json({
        success: false,
        message: "Our team will verify you then you can login",
      });
    }
    if (user.role === "client") {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to login",
      });
    }
    const password = req.body.password;
    const isPasswordTrue = bcrypt.compareSync(password, user.password);
    if (!isPasswordTrue) {
      return res.status(401).json({
        success: false,
        message: "UserId or password is incorrect",
      });
    }

    const expiryDateTime =
      Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60; // 7 days in seconds
    const payload = {
      id: user.id,
      userId: user.userId,
      name: user.name,
      role: user.role,
      approved: user.approved,
      exp: expiryDateTime,
    };
    let token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    await UserModel.findByIdAndUpdate(user.id, { $set: { token: token } });

    // Set the token and role in an HTTP-only cookie
    const cookieData = {
      token: token,
      role: user.role, // Store the role in the cookie
      userId: user._id,
      userName: user.name || user.companyName || "NA",
    };
    res.cookie("authData", JSON.stringify(cookieData), {
      httpOnly: false, // Protect the cookie from JavaScript access
      sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration: 7 days
      path: "/",
    });
    res.json({
      success: true,
      message: "User logged in successfully",
      userId: user.userId,
      userName: user.name || user.companyName,
      token: token,
      userRole: user.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down",
    });
  }
};

// getclient for admin
const getClientsForAdmin = async (req, res) => {
  const admin = req.user;
  const { search } = req.query;
  try {
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    let clients = [];
    if (search) {
      clients = await ClientModel.find({
        $or: [
          { "email.email": { $regex: search, $options: "i" } },
          { companyName: { $regex: search, $options: "i" } },
          { companyCountry: { $regex: search, $options: "i" } },
        ],
      }).select("-password -token -otp -otpCreatedAt -termAndCoditionsAgreed");
    } else {
      // Fetch all clients when no search query is provided
      clients = await ClientModel.find({}).select(
        "-password -token -otp -otpCreatedAt -termAndCoditionsAgreed"
      );
    }
    if (!clients || clients.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No clients found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Clients fetched successfully",
      result: clients,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down",
    });
  }
};

const getAgentsForAdmin = async (req, res) => {
  const admin = req.user;
  const { search } = req.query;
  try {
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    let agents = [];
    if (search) {
      agents = await UserModel.find({
        $or: [
          { "email.email": { $regex: search, $options: "i" } },
          { name: { $regex: search, $options: "i" } },
          { country: { $regex: search, $options: "i" } },
        ],
      }).select("-password -token -otp -otpCreatedAt");
    } else {
      // Fetch all clients when no search query is provided
      agents = await UserModel.find({}).select(
        "-password -token -otp -otpCreatedAt"
      );
    }
    if (!agents || agents.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No Agents found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Agents fetched successfully",
      result: agents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down",
    });
  }
};

const verifyAgents = async (req, res) => {
  const admin = req.user;

  try {
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }
    const { agentid } = req.params;

    // Check if agent ID is provided
    if (!agentid) {
      return res.status(400).json({
        success: false,
        message: "Agent ID is required",
      });
    }

    // Find the agent by ID
    const agent = await UserModel.findById(agentid);

    // Check if agent exists
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }
    if (agent.verified) {
      return res.status(400).json({
        success: false,
        message: "Agent is already verified",
      });
    }
    agent.verified = true;
    // Mark phone number as verified if present and not already verified
    if (agent.phoneNumber && !agent.phoneNumber.verified) {
      agent.phoneNumber.verified = true;
    }
    if (agent.verifiedIdDocuments && agent.verifiedIdDocuments.length > 0) {
      agent.verifiedIdDocuments = agent.verifiedIdDocuments.map((doc) => ({
        ...doc,
        verified: true,
      }));
    }
    await agent.save();
    res.status(200).json({
      success: true,
      message: "Agent verified successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down",
    });
  }
};

const getDocsOfAgent = async (req, res) => {
  const admin = req.user;
  try {
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }
    const { agentid } = req.params;
    const agent = await UserModel.findById(agentid).select(
      "verifiedIdDocuments"
    );
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }
    if (!agent.verifiedIdDocuments || agent.verifiedIdDocuments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No documents found for this agent",
      });
    }

    const documents = agent.verifiedIdDocuments
      .map((doc) => {
        const filePath = path.resolve(doc.docPath);
        if (fs.existsSync(filePath)) {
          return {
            docName: doc.docName,
            docPath: `${req.protocol}://${req.get(
              "host"
            )}/documents/${path.basename(filePath)}`,
            verified: doc.verified,
          };
        }
        return null;
      })
      .filter(Boolean); // Filter out null values if files do not exist

    if (documents.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No valid documents found on the server",
      });
    }

    res.status(200).json({
      success: true,
      documents,
    });
  } catch (error) {
    console.error("Error sending PDF file:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send the PDF file",
    });
  }
};

const getLogoOfClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    // Fetch client from DB
    const client = await ClientModel.findById(clientId).select("companyLogo");
    if (!client || !client.companyLogo) {
      return res.status(404).json({
        success: false,
        message: "Client or logo not found",
      });
    }

    const logoPath = path.resolve(`Assets/images/${client.companyLogo}`);
    // Check if file exists
    if (!fs.existsSync(logoPath)) {
      return res.status(404).json({
        success: false,
        message: "Logo file not found on server",
      });
    }

    // Determine the MIME type dynamically
    const extension = path.extname(logoPath).toLowerCase();
    let contentType = "image/jpeg"; // Default

    if (extension === ".png") {
      contentType = "image/png";
    } else if (extension === ".jpg" || extension === ".jpeg") {
      contentType = "image/jpeg";
    }

    // Set response headers and send file
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({
      success: true,
      logo: `${req.protocol}://${req.get("host")}/images/${client.companyLogo}`,
    });
  } catch (error) {
    console.error("Error sending logo:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching logo",
    });
  }
};

// Get all client of agent
const getAgentsClient = async (req, res) => {
  const agentId = req.user.id;
  const { search } = req.query;
  try {
    const agent = await UserModel.findById(agentId);
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }
    let clients = [];

    // Build base query
    const query = {
      _id: { $in: agent.clients },
    };

    // If search exists, add regex filters
    if (search) {
      query.$or = [
        { "email.email": { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { companyCountry: { $regex: search, $options: "i" } },
      ];
    }

    clients = await ClientModel.find(query).select(
      "-password -token -otp -otpCreatedAt -termAndCoditionsAgreed"
    );

    if (!clients || clients.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching clients found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Clients fetched successfully",
      result: clients,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Server down",
    });
  }
};

const getClientActiveSubscriptionDetails = async (req, res) => {
  const clientId = req.params.clientId;
  const user = req.user;
  try {
    const client = await ClientModel.findById(clientId);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client Not Found",
      });
    }
    if (
      (user.role === "agent" &&
        client.agent.toString() !== user._id.toString()) ||
      (user.role === "masterclient" && user._id.toString() !== clientId)
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    const subscriptions = await stripe.subscriptions.list({
      customer: client.stripeCustomerId,
      status: "active",
      limit: 1,
    });
    if (subscriptions.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No active subscription found for this customer.",
      });
    }
    const subscription = subscriptions.data[0]; // Assuming customer has only one subscription
    const planName =
      subscription.items.data[0]?.plan.nickname || "Unknown Plan";
    const startDate = new Date(
      subscription.start_date * 1000
    ).toLocaleDateString();
    const endDate = subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000).toLocaleDateString()
      : "N/A";

    res.status(201).json({
      success: true,
      message: "Subscription Found",
      activePlan: planName,
      startDate: startDate,
      endDate: endDate,
      status: subscription.status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down",
    });
  }
};
const getClientAllSubscriptionDetails = async (req, res) => {
  const clientId = req.params.clientId;
  const user = req.user;
  try {
    const client = await ClientModel.findById(clientId);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client Not Found",
      });
    }
    // matching that the request is for the clients which agents
    if (
      (user.role === "agent" &&
        client.agent.toString() !== user._id.toString()) ||
      (user.role === "masterclient" && user._id.toString() !== clientId)
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    const subscriptions = await stripe.subscriptions.list({
      customer: client.stripeCustomerId,
    });

    if (!subscriptions.data.length) {
      return res.status(404).json({
        success: false,
        message: "No subscriptions found for this customer.",
      });
    }

    // Format the subscription data
    const formattedSubscriptions = subscriptions.data.map((subscription) => ({
      id: subscription.id,
      planName: subscription.items.data[0]?.plan.nickname || "Unknown Plan",
      startDate: new Date(subscription.start_date * 1000)
        .toISOString()
        .split("T")[0], // Format: YYYY-MM-DD
      endDate: subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000)
            .toISOString()
            .split("T")[0]
        : "N/A",
      status: subscription.status,
    }));

    res.status(200).json({
      success: true,
      message: "Subscriptions Found",
      result: formattedSubscriptions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down",
    });
  }
};

const getAllUserCards = async (req, res) => {
  const { clientId } = req.params;
  const user = req.user;
  try {
    // Find client details from the database
    const client = await ClientModel.findById(clientId);
    if (!client || !client.stripeCustomerId) {
      return res.status(404).json({
        success: false,
        message: "Client or Stripe Customer ID not found",
      });
    }
    if (
      (user.role === "agent" &&
        client.agent.toString() !== user._id.toString()) ||
      (user.role === "masterclient" && user._id.toString() !== clientId)
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    // Fetch all saved payment methods (cards)
    const customer = await stripe.customers.retrieve(client.stripeCustomerId);
    const defaultPaymentMethodId =
      customer.invoice_settings.default_payment_method;
    const paymentMethods = await stripe.paymentMethods.list({
      customer: client.stripeCustomerId,
      type: "card",
    });

    res.status(200).json({
      success: true,
      paymentMethods: paymentMethods.data.map((card) => ({
        id: card.id,
        last4: card.card.last4,
        brand: card.card.brand,
        expMonth: card.card.exp_month,
        expYear: card.card.exp_year,
        type: card.card.funding,
        isDefault: card.id === defaultPaymentMethodId, // Check if this is the default card
      })),
    });
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Can cancel subscription after 3 months only
const cancelSubscription = async (req, res) => {
  const clientId = req.params.clientId;
  const user = req.user;
  console.log("working");
  try {
    const client = await ClientModel.findById(clientId);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client Not Found",
      });
    }
    // matching that the request is for the clients which agents
    if (
      (user.role === "agent" &&
        client.agent.toString() !== user._id.toString()) ||
      (user.role === "masterclient" && user._id.toString() !== clientId)
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    const stripeCustomerId = client.stripeCustomerId;
    if (!stripeCustomerId) {
      return res
        .status(400)
        .json({ success: false, message: "Client not subscribed" });
    }
    // Get the active subscription
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return res.status(404).json({ error: "No active subscription found" });
    }

    const subscription = subscriptions.data[0];
    const startDate = subscription.start_date; // Subscription start timestamp
    const threeMonthsFromStart = startDate + 60 * 60 * 24 * 90; // 90 days in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime < threeMonthsFromStart) {
      // If 3 months have not passed, return time left
      const timeLeft = threeMonthsFromStart - currentTime;
      const daysLeft = Math.ceil(timeLeft / (60 * 60 * 24));

      return res.status(403).json({
        success: false,
        message: `Subscription can be canceled in ${daysLeft} days.`,
        timeLeftToCancel: `${daysLeft} days left to cancel`,
      });
    }

    // If more than 3 months have passed, cancel the subscription
    const successResponse = await stripe.subscriptions.cancel(subscription.id);
    console.log(successResponse);
    return res.status(201).json({
      success: true,
      message: "Subscription canceled successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down",
    });
  }
};

// get agent details for self
const getAgentOwnDetails = async (req, res) => {
  try {
    const agent = await UserModel.findById(req.user._id).select(
      "-password -token -otp -otpCreatedAt"
    ); // Exclude password for security

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    // Ensure the user is fetching their own details
    if (req.user.id !== agent._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this information",
      });
    }

    res.status(200).json({
      success: true,
      message: "Agent Found",
      result: agent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Down",
    });
  }
};

// Logout the user
const logoutUser = async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Get token from header
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }
    const user =
      (await UserModel.findById(req.user.id)) ||
      (await ClientModel.findById(req.user.id));
    user.token = null;
    await user.save();
    addToBlacklist(token);
    res.clearCookie("authData", {
      httpOnly: false, // Protect the cookie from JavaScript access
      sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration: 7 days
      path: "/",
    });
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down",
    });
  }
};
module.exports = {
  createAgent,
  createClientByAgent,
  registerClient,
  loginUser,
  registerAdmin,
  getClientsForAdmin,
  getAgentsForAdmin,
  verifyAgents,
  getDocsOfAgent,
  getAgentsClient,
  getLogoOfClient,
  getClientActiveSubscriptionDetails,
  getClientAllSubscriptionDetails,
  getAllUserCards,
  cancelSubscription,
  getAgentOwnDetails,
  logoutUser,
};
