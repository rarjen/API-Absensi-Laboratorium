const router = require("express").Router();
// const authorize = require("../middlewares/authorize");
const jabatan = require("../controllers/jabatan");

router.get("/", jabatan.index);
router.post("/create", jabatan.create);
router.put("/edit/:id_jabatan", jabatan.update);
router.delete("/edit/:id_jabatan", jabatan.destroy);

module.exports = router;
