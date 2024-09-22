const axios = require("axios");
const { worldBankFullUrl, worldBankHeaders } = require("../helpers/constants");

// Datos
const CACHE_DURATION = 3 * 60 * 60 * 1000;
let worldBankDataCache = {
	data: null,
	lastFetch: 0,
};

// Process functions
const isCacheExpired = () => {
	const now = Date.now();
	if (worldBankDataCache.data && now - worldBankDataCache.lastFetch < CACHE_DURATION) {
		return false;
	}
	return true;
};
const mapSearchParamsToWorldBankApi = (searchObj) => {
	const keyMap = {
		entityName: "SUPP_NAME",
		entityAddress: "SUPP_ADDR",
	};

	const mappedObj = {};
	for (let key in searchObj) {
		if (keyMap[key]) {
			mappedObj[keyMap[key]] = searchObj[key];
		}
	}
	return mappedObj;
};
const findMatches = (searchObj, arr) => {
	const partialMatches = [];
	let fullMatch = undefined;

	// Se recorre cada item del objeto de entidades
	arr.forEach((item) => {
		const newSearchObj = mapSearchParamsToWorldBankApi(searchObj);

		for (let key in newSearchObj) {
			if (!newSearchObj[key]) continue;
			const searchValue = newSearchObj[key].toLowerCase();
			const itemValue = item[key] ? item[key].toLowerCase() : "";

			// Verificamos que haya coincidencia parcial
			if (itemValue.includes(searchValue)) {
				const newItem = {
					blacklistSource: "worldbank",
					firmName: item.SUPP_NAME,
					firmAddress: item.SUPP_ADDR,
					firmCountry: item.COUNTRY_NAME,
					ineligibilityStartDate: item.DEBAR_FROM_DATE,
					ineligibilityEndDate: item.DEBAR_TO_DATE,
				};
				if (searchValue === itemValue) {
					fullMatch = newItem;
					partialMatches.push(newItem);
					break;
				}
				partialMatches.push(newItem);
				break;
			}
		}
	});

	return {
		partialMatches,
		fullMatch,
	};
};
const buildResponse = (partialMatches, fullMatch) => {
	return {
		matchesFound: partialMatches.length > 0 || fullMatch != undefined,
		isExactMatch: fullMatch != undefined,
		exactMatch: fullMatch != undefined ? fullMatch : {},
		matchesCount: partialMatches.length,
		matchesList: partialMatches,
	};
};

// Main function
module.exports.searchBy = async (searchObj, cookie) => {
	if (isCacheExpired()) {
		// Every three hours, renews the cache. This according to the World Bank web information
		const result = await axios.get(worldBankFullUrl, { headers: worldBankHeaders });
		worldBankDataCache = { data: result.data, lastFetch: Date.now() };
	}

	// ZPROCSUPP is the key that contains the data
	const data = worldBankDataCache.data.response.ZPROCSUPP;

	// Find matches from searchObj in data. Ex. searchObj = { entityName: "John Doe", entityAddress: "123 Main St" }
	const { partialMatches, fullMatch } = findMatches(searchObj, data);

	return buildResponse(partialMatches, fullMatch);
};
