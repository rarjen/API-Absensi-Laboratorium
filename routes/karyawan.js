const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const role = require("../utils/enum");
const karyawan = require("../controllers/karyawan");

router.get("/", authorize(role.admin), karyawan.index);
router.get("/:id_karyawan", authorize(role.admin), karyawan.show);
router.post("/create", authorize(role.admin), karyawan.create);
router.put("/edit/:id_karyawan", authorize(role.admin), karyawan.update);
router.delete("/delete/:id_karyawan", authorize(role.admin), karyawan.destroy);

module.exports = router;
