const axios = require("axios");

// Average response time: 15ms. There is no need to save the response in a vriable, so we can return the result directly.
module.exports.generateProxyHostAndPort = async () => {
	const proxies = await axios.get("https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt").then((response) => {
		return response.data.split("\n");
	});

	const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
	const [host, port] = randomProxy.split(":");
	return { host, port };
};

module.exports.generateRandomIp = () => {
	const ip = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join(".");
	return ip;
};
