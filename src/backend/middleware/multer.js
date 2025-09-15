// backend/middleware/multer.js
const multer = require('multer');
const path = require('path');

// Set storage destination and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename
  },
});

// Initialize multer with storage settings
const upload = multer({ storage: storage });

module.exports = upload;
