const { searchByName } = require("./services/oslService");
const { searchBy } = require("./services/worldbankService");

// Offshore Leaks database evaluation. This route evaluates only by name
module.exports.evaluateRiskInOsl = async (req, res) => {
	const response = await searchByName(req.body.entityName);
	if (response) res.success(response);
	else res.error("No matches found", 404);
};

// World Bank database evaluation. This route evaluates by name and address
module.exports.evaluateRiskInWorldBank = async (req, res) => {
	const response = await searchBy(req.body);
	if (response.matchesFound) res.success(response);
	else res.error("No matches found", 404);
};
