const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const role = require("../utils/enum");
const avatar = require("../controllers/avatar");
const mediaValidation = require("../utils/media/media-validation");

router.post(
  "/upload",
  authorize(role.admin),
  mediaValidation.image.single("avatar"),
  avatar.uploadAvatar
);

module.exports = router;
