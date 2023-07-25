const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const { ROLES } = require("../utils/enum");
const shift = require("../controllers/shift");

router.get("/", authorize(), shift.indexShift);
router.get("/:shift_id", authorize(), shift.showShift);
router.post("/create", authorize(ROLES.ADMIN), shift.createShift);
router.put("/edit/:shift_id", authorize(ROLES.ADMIN), shift.editShift);

module.exports = router;
