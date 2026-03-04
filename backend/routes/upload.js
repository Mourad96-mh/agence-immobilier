const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST /api/upload
router.post("/", auth, (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const stream = cloudinary.uploader.upload_stream(
      { folder: "immobilier" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({ message: error.message });
        }
        res.json({ url: result.secure_url });
      },
    );

    stream.end(req.file.buffer);
  });
});

module.exports = router;
