const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const uploadDir = path.join(__dirname, "../Assets/docs");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = new multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Destination folder for uploads
  },
  filename: function (req, file, cb) {
    console.log(file, "middle")
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const shortUuid = uuidv4().replace(/-/g, "").slice(0, 12);
    cb(null, `${Date.now()}-${shortUuid}${fileExtension}`); // Filename configuration
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const uploadDocs = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
}).array("pdfFiles", 5); // This is key - "pdfFiles" must match the form field

module.exports = { uploadDocs };
