const router = require("express").Router();
// const authorize = require("../middlewares/authorize");
const karyawan = require("../controllers/karyawan");

router.get("/", karyawan.index);
router.get("/:id_karyawan", karyawan.show);
router.post("/create", karyawan.create);
router.put("/edit/:id_karyawan", karyawan.update);
router.delete("/delete/:id_karyawan", karyawan.destroy);

module.exports = router;
