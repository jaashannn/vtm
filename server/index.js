const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./Routes/userRoute.js");
const paymentRoute = require("./Routes/paymentRoute.js");
const commonRoute = require("./Routes/CommonRoute.js");
const path = require("path");
const morgan = require("morgan");
const { authMiddleware } = require("./Middlewares/authMiddleware.js");

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Db connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });
app.use(morgan("dev"));
const docsDirectory = path.join(__dirname, "Assets", "docs");
app.use("/documents", authMiddleware(["admin"]), express.static(docsDirectory));
const imagesDirectory = path.join(__dirname, "Assets", "images");
app.use("/images", express.static(imagesDirectory));

// ------------------- Routes ----------------------
app.use("/api/user", userRoute);
app.use("/api/payment", paymentRoute);
app.use("/api", commonRoute);

// Handling unexpected error
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    res.status(400).send(err.message);
  } else if (err) {
    // An unknown error occurred.
    res.status(500).send("Something broke!");
  } else {
    next();
  }
});

// Server start
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(
    `Server is high and running at http://localhost:${process.env.PORT}`
  );
});
