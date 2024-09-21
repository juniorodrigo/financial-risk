const axios = require("axios");
const { searchByCategory } = require("./services/oslService");
const { generateProxyHostAndPort } = require("./services/proxyService");

// Offshore Leaks database evaluation
const evaluateRiskInOsl = async (entity) => {
	const categoriesToSearch = ["offshore-entities"]; //"officers", "intermediaries", "addresses"

	let result = {};

	for (const category of categoriesToSearch) {
		result = await searchByCategory(category, entity);
	}
	return result;
};

const evaluateRiskInWorldBank = async () => { };

const evaluateRiskInOfac = async () => { };

// This function evaluates the risk of a company in all the databases
module.exports.evaluateRisk = async (req, res) => {
	try {
		const { entity, officer, intermediarie, address } = req.body;
		// console.log(entity);
		const riskEvaluation = await evaluateRiskInOsl(entity);
		res.success(riskEvaluation);
	} catch (error) {
		console.log(error);
		res.error(error);
	}
};
