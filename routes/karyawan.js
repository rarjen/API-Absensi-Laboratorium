const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");
const karyawan = require("../controllers/karyawan");

router.get("/", karyawan.index);
router.get("/:karyawan_id", authorize(), karyawan.show);
router.post("/create", authorize(ROLES.ADMIN), karyawan.create);
router.put("/edit/:karyawan_id", authorize(ROLES.ADMIN), karyawan.update);
router.delete("/:karyawan_id", authorize(ROLES.ADMIN), karyawan.destroy);

module.exports = router;
