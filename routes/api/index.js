const express = require("express");
const uploadCloud = require("../../config/cloudinary");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
