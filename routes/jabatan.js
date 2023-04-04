const router = require("express").Router();
const role = require("../utils/enum");
const authorize = require("../middlewares/authorize");
const jabatan = require("../controllers/jabatan");

router.get("/", authorize(role.admin), jabatan.index);
router.get("/:id_jabatan", authorize(role.admin), jabatan.show);
router.post("/create", authorize(role.admin), jabatan.create);
router.put("/edit/:id_jabatan", authorize(role.admin), jabatan.update);
router.delete("/delete/:id_jabatan", authorize(role.admin), jabatan.destroy);

module.exports = router;
