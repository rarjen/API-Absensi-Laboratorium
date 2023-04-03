const router = require("express").Router();
const karyawan = require("./karyawan");
const role = require("./jabatan");

router.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "success",
    data: null,
  });
});

router.use("/karyawan", karyawan);
router.use("/role", role);

module.exports = router;
