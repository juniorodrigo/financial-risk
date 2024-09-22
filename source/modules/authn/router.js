const router = require("express").Router();
const { generateApiKey } = require("./controller");

router.get("/generate-key", generateApiKey);

module.exports = router;
