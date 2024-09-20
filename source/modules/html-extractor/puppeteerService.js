const puppeteer = require("puppeteer");

let browser; // Variable para almacenar la instancia del navegador

const initBrowser = async () => {
	if (!browser) {
		browser = await puppeteer.launch({
			headless: true, // Cambiar a false si deseas ver el navegador
		});
		console.log("Browser initialized");
	}
};

const getPageContent = async (url) => {
	await initBrowser(); // Asegúrate de que el navegador esté inicializado
	const page = await browser.newPage(); // Abre una nueva pestaña
	await page.goto(url, {
		waitUntil: "networkidle2",
	});
	const html = await page.content();
	await page.close(); // Cierra la pestaña
	return html;
};

const closeBrowser = async () => {
	if (browser) {
		await browser.close();
		browser = null; // Libera la referencia
	}
};

module.exports = {
	initBrowser,
	getPageContent,
	closeBrowser,
};
