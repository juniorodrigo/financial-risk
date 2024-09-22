const bcrypt = require("bcrypt");
require("dotenv").config();

const API_KEY_BASE = process.env.API_KEY_BASE;

module.exports.generateApiKey = async (req, res) => {
	try {
		// Generar un hash de la clave base, que es un valor del .env.
		const hashedKey = await bcrypt.hash(API_KEY_BASE, 1);

		res.success({ apiKey: hashedKey });
	} catch (error) {
		res.error("Error generando la API key");
	}
};

// Middlewares section
module.exports.validateApiKey = async (req, res, next) => {
	const apiKey = req.headers["x-api-key"];

	if (!apiKey) return res.error("API key is required", 401);

	if (await bcrypt.compare(API_KEY_BASE, apiKey)) next();
	else res.error("Invalid API key", 401);
};
