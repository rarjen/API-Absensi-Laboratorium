const router = require("express").Router();
const auth = require("./auth");
const karyawan = require("./karyawan");
const jabatan = require("./jabatan");
const absensi = require("./absensi");
const shift = require("./shift");

router.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "success",
    data: null,
  });
});

router.use("/auth", auth);
router.use("/karyawan", karyawan);
router.use("/jabatan", jabatan);
router.use("/absensi", absensi);
router.use("/shift", shift);

module.exports = router;
