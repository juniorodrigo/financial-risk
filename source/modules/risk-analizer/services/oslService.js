const axios = require("axios");
const cheerio = require("cheerio");

const { oslBaseUrl, oslCookies, oslUserAgents, oslSecChUas, oslSecChUaPlatforms } = require("../helpers/constants");
const { textToUrlText } = require("../../../common/others/others");

// Generate functions
const generateParameters = (categoryId, query) => {
	return `c=&cat=${categoryId}&d=&j=&q=${textToUrlText(query)}`;
};
const generateUrl = (parameters) => {
	return `${oslBaseUrl}/search?${parameters};`;
};
const generateHeaders = (parameters, cookie = oslCookies) => {
	const agent = oslUserAgents[Math.floor(Math.random() * (oslUserAgents.length + 1))];
	const secChUa = oslSecChUas[Math.floor(Math.random() * (oslSecChUas.length + 1))];
	const secChUaPlatform = oslSecChUaPlatforms[Math.floor(Math.random() * (oslSecChUaPlatforms.length + 1))];
	const ip = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join(".");

	return {
		accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
		"accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,es-PE;q=0.5,es-MX;q=0.4",
		"cache-control": "max-age=0",
		cookie: oslCookies,
		dnt: "1",
		priority: "u=0, i",
		referer: `${oslBaseUrl}/search?${parameters}`,
		"sec-ch-ua": secChUa,
		"sec-ch-ua-mobile": "?0",
		"sec-ch-ua-platform": secChUaPlatform,
		"sec-fetch-dest": "document",
		"sec-fetch-mode": "navigate",
		"sec-fetch-site": "same-origin",
		"upgrade-insecure-requests": "1",
		"user-agent": agent,
		"X-Real-IP": ip,
	};
};

// Proccess functions
const parseHtmlResults = (htmlString) => {
	// Esta es una función tediosa, pero necesaria para extraer la tabla de la página
	const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/;
	const match = htmlString.match(tableRegex);

	if (match) {
		const table = match[0];

		const $ = cheerio.load(table);
		const data = [];

		$("tbody tr").each((index, element) => {
			const blacklistSource = "offshore-leaks";
			const entityName = $(element).find("td:nth-child(1) a").text().trim(); // Primer td con <a>
			const detailsUrl = oslBaseUrl + $(element).find("td:nth-child(1) a").attr("href"); // Href del <a>
			const jurisdiction = $(element).find("td:nth-child(2)").text().trim(); // Segundo td
			const countryLinkedTo = $(element).find("td:nth-child(3)").text().trim(); // Tercer td
			const dataFrom = $(element).find("td:nth-child(4) a").text().trim(); // Cuarto td

			// Añadimos los datos como un objeto al array
			data.push({
				blacklistSource,
				entityName,
				detailsUrl,
				jurisdiction,
				countryLinkedTo,
				dataFrom,
			});
		});

		return data;
	} else {
		return undefined;
	}
};
const getExactNameMatchIndex = (entityNameParam, items) => {
	return (index = items.findIndex((item) => item.entityName.toLowerCase() === entityNameParam.toLowerCase()));
};
const buildResponse = (matchesList, exactMatchIndex) => {
	return {
		matchesFound: matchesList.length > 0 || exactMatchIndex >= 0,
		isExactMatch: exactMatchIndex >= 0,
		exactMatch: exactMatchIndex >= 0 ? matchesList[exactMatchIndex] : {},
		matchesCount: matchesList.length,
		matchesList: matchesList,
	};
};

// Main function
// TODO: Eliminar espacios finales e iniciales de parámetro
module.exports.searchByName = async (entityName, cookie) => {
	const parameters = generateParameters("offshore-entities", entityName);
	const url = generateUrl(parameters);
	const headers = generateHeaders(parameters, cookie ? cookie : undefined);

	const response = await axios.get(url, { headers: headers });

	const matchesList = parseHtmlResults(response.data);
	if (!matchesList) return buildResponse([], -1);

	const exactMatchIndex = getExactNameMatchIndex(entityName, matchesList);
	const finalResult = buildResponse(matchesList, exactMatchIndex);
	return finalResult;
};
