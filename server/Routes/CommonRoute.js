const express = require("express");
const { fetchPackages } = require("../Controllers/CommonRouteController");
const router = express.Router();

router.get("/packages", fetchPackages);
module.exports = router;
