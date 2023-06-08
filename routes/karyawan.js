const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const role = require("../utils/enum");
const karyawan = require("../controllers/karyawan");

router.get("/", authorize(role.admin), karyawan.index);
router.get("/:karyawan_id", authorize(role.admin), karyawan.show);
router.post("/create", authorize(role.admin), karyawan.create);
router.put("/edit/:karyawan_id", authorize(role.admin), karyawan.update);
router.delete("/delete/:karyawan_id", authorize(role.admin), karyawan.destroy);

module.exports = router;
