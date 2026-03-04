const multer = require('multer');

// Store file in memory buffer — cloudinary upload happens in the route
module.exports = multer({ storage: multer.memoryStorage() });
