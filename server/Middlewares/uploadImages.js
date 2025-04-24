const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

// Set the destination folder for image uploads
const uploadDir = path.join(__dirname, "../Assets/images");

// Check if the directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration with uuidv4 for unique filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Destination folder for image uploads
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const shortUuid = uuidv4().replace(/-/g, "").slice(0, 12);
    cb(null, `${Date.now()}-${shortUuid}${fileExtension}`); // Unique filename using uuid
  },
});

// File filter to allow only specific image formats
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png image files are allowed!"), false);
  }
};

// Multer configuration with file size limit and file filter
const uploadImage = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
}).single("imageFile"); // Accept only a single image file

module.exports = { uploadImage };
