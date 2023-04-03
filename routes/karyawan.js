const router = require("express").Router();
// const authorize = require("../middlewares/authorize");
const karyawan = require("../controllers/karyawan");

router.get("/", karyawan.index);
router.post("/create", karyawan.create);
router.put("/create/:id_karyawan", karyawan.update);

module.exports = router;
