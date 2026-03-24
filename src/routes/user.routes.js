const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const upload = require("../middleware/upload.middleware");
const { protect } = require("../middleware/auth.middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.post(
  "/upload-profile",
  protect,
  upload.single("profile"),
  userController.uploadProfile
);

module.exports = router;