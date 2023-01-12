const { Router } = require("express");
const router = Router();
const { payout } = require("../controller/payout");

router.post("/payout", payout);
module.exports = router;