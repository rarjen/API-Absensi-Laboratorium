const router = require("express").Router();
const auth = require("./auth");
const karyawan = require("./karyawan");
const role = require("./jabatan");
const avatar = require("./avatar");
const absensi = require("./absensi");

router.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "success",
    data: null,
  });
});

router.use("/auth", auth);
router.use("/karyawan", karyawan);
router.use("/role", role);
router.use("/avatar", avatar);
router.use("/absensi", absensi);

module.exports = router;
