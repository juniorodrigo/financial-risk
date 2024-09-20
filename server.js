require("module-alias/register");
require("dotenv").config();

const express = require("express");
// const { initBrowser } = require("./source/modules/html-extractor/puppeteerService");

const riskAnalizerRouter = require("./source/modules/risk-analizer/router");
const responseMiddleware = require("./source/common/middlewares/response");

(async () => {
	//Inicios
	// await initBrowser();

	// Definiciones
	const app = express();
	const PORT = process.env.PORT || 3000;

	// Middlewares
	app.use(express.json());
	app.use(responseMiddleware);

	// Rutas
	app.use("/risk", riskAnalizerRouter);

	// Inicio del servidor
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
})();
