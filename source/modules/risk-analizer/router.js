const router = require("express").Router();
const { evaluateRiskInOsl, evaluateRiskInWorldBank } = require("./controller");

router.post("/offshoreleaks", evaluateRiskInOsl);
router.post("/worldbank", evaluateRiskInWorldBank);

module.exports = router;
