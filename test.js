const axios = require("axios");

axios
	.get("https://offshoreleaks.icij.org/search?q=Odebrecht&c=&j=&d=", {
		headers: {
			accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
			"accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,es-PE;q=0.5,es-MX;q=0.4",
			"cache-control": "max-age=0",
			cookie:
				"_gid=GA1.2.321073196.1726717630; terms.accept=1; disclaimer.collapsed=1; _ga=GA1.2.1883019273.1726717629; _ga_PJ4Y19JL7T=GS1.1.1726722156.2.1.1726722548.60.0.0; aws-waf-token=a4c98636-b22f-4913-9a45-1dc167dc718e:EAoAn5kj81gPAAAA:N/7zw4220P6TfiKt/HL3W9Mg9m5viRkdTBEApajWXx3VKBqtwLsxd55+i40WYBioCd95Pw5WcOgz7RYx0vULlUWxD4kgUFkdVVj2k4baHUU+6jX0wrs1SlQnqCfFGADW09+oYSvA9WfzkG2zF5l8qxnFmPp4cwKUpo14Fjq1d4CQfZXghXF0Dr7Ws3PnDHGTtqi+pmA6xNbDW0HTrm2iQt8=",
			dnt: "1",
			priority: "u=0, i",
			referer: "https://offshoreleaks.icij.org/search?q=Odebrecht&c=&j=&d=",
			"sec-ch-ua": '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"Windows"',
			"sec-fetch-dest": "document",
			"sec-fetch-mode": "navigate",
			"sec-fetch-site": "same-origin",
			"upgrade-insecure-requests": "1",
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0",
		},
	})
	.then((response) => {
		console.log(response.data);
	})
	.catch((error) => {
		console.error("Error:", error);
	});
