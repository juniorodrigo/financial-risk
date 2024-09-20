const axios = require("axios");
const cheerio = require("cheerio");

const { cookiex, userAgents, secChUas, secChUaPlatforms } = require("../helpers/constants");
const { generateRandomIp } = require("./proxyService");
const { textToUrlText } = require("../../../common/others/others");

// Generate functions
const generateParameters = (categoryId, query) => {
	return `c=&cat=${categoryId}&d=&j=&q=${textToUrlText(query)}`;
};
const generateUrl = (parameters) => {
	return `https://offshoreleaks.icij.org/search?${parameters};`;
};
const generateHeaders = (parameters, cookie = cookiex) => {
	const agent = userAgents[Math.floor(Math.random() * (userAgents.length + 1))];
	const secChUa = secChUas[Math.floor(Math.random() * (secChUas.length + 1))];
	const secChUaPlatform = secChUaPlatforms[Math.floor(Math.random() * (secChUaPlatforms.length + 1))];
	const ip = generateRandomIp();

	return {
		accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
		"accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,es-PE;q=0.5,es-MX;q=0.4",
		"cache-control": "max-age=0",
		cookie: cookiex,
		dnt: "1",
		priority: "u=0, i",
		referer: `https://offshoreleaks.icij.org/search?${parameters}`,
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
			const name = $(element).find("td:nth-child(1) a").text().trim(); // Primer td con <a>
			const link = $(element).find("td:nth-child(1) a").attr("href"); // Href del <a>
			const jurisdiction = $(element).find("td:nth-child(2)").text().trim(); // Segundo td
			const country = $(element).find("td:nth-child(3)").text().trim(); // Tercer td
			const dataSource = $(element).find("td:nth-child(4) a").text().trim(); // Cuarto td

			// Añadimos los datos como un objeto al array
			data.push({
				name,
				link,
				jurisdiction,
				country,
				dataSource,
			});
		});

		return data;
	} else {
		throw new Error("No results found");
	}
};
const getExactNameMatchIndex = (name, items) => {
	const normalizedName = name.toLowerCase();

	return items.findIndex((item) => item.name.toLowerCase() === normalizedName);
};

const buildResponse = (data, exactMatchIndex) => {
	return {
		matchesFound: data.length > 0 || exactMatchIndex > 0,
		exactMatch: exactMatchIndex > 0,
		exactMatchResult: exactMatchIndex > 0 ? data[exactMatchIndex] : {},
		matchesCount: data.length,
		matchesList: data,
	};
};

// Main function
module.exports.searchByCategory = async (category, name, cookie) => {
	const categoryMap = {
		"offshore-entities": "0",
		officers: "2",
		intermediaries: "3",
		addresses: "3",
	};

	if (!categoryMap[category]) {
		throw new Error("Invalid category");
	}

	const parameters = generateParameters(categoryMap[category], name);
	const url = generateUrl(parameters);
	const headers = generateHeaders(parameters, cookie ? cookie : undefined);

	const response = await axios.get(url, { headers: headers });

	const result = parseHtmlResults(response.data);
	const exactMatchIndex = getExactNameMatchIndex(name, result);

	return buildResponse(result, exactMatchIndex);
};
