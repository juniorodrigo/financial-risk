const router = require("express").Router();
const { evaluateRisk } = require("./controller");
const { getPageContent } = require("../html-extractor/puppeteerService");

router.get("/evaluate", evaluateRisk);
router.get("/test", async (req, res) => {
	const content = await getPageContent("https://offshoreleaks.icij.org/search?q=Odebrecht&c=&j=&d=");
	console.log(content);

	console.log(content);
	res.success();
});

module.exports = router;
