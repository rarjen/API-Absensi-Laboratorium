const router = require("express").Router();
const absensi = require("../controllers/absensi");

router.post("/post-absen", absensi.absen);

module.exports = router;
