require("module-alias/register");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const responseMiddleware = require("./source/common/middlewares/response");
const { validateApiKey } = require("./source/modules/authn/controller");

const authnRouter = require("./source/modules/authn/router");
const riskAnalizerRouter = require("./source/modules/risk-analizer/router");

// Definiciones
const app = express();
const PORT = process.env.PORT || 3000;
const evaluationApiLimit = rateLimit({
	windowMs: 60 * 1000,
	max: 20,
	message: (req, res) => {
		res.error("Too many requests, please try again later", 429);
	},
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(responseMiddleware);

// Rutas
app.use("/evaluate-risk", [validateApiKey, evaluationApiLimit], riskAnalizerRouter);
app.use("/authn", authnRouter);

// Inicio del servidor
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
