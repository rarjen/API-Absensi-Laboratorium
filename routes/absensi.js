const router = require("express").Router();
const absensi = require("../controllers/absensi");
const authorize = require("../middlewares/authorize");
const role = require("../utils/enum");

router.post("/post-absen", absensi.absen);
router.get("/get-absen", authorize(role.admin), absensi.show);
module.exports = router;
