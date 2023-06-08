const router = require("express").Router();
const absensi = require("../controllers/absensi");
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");

router.post("/postAbsen", absensi.absen);
router.put("/postAbsenPulang/:absen_id", absensi.absenPulang);
router.get("/getTodayAbsen", absensi.showNow);
router.get("/getAbsen", authorize(ROLES.ADMIN), absensi.show);
module.exports = router;
