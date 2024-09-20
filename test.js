const axios = require("axios");

axios
	.get("https://offshoreleaks.icij.org/search?q=Odebrecht&c=&j=&d=", {
		headers: {
			accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
			"accept-language": "es,es-ES;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,es-PE;q=0.5,es-MX;q=0.4",
			"cache-control": "max-age=0",
			cookie:
				"_gid=GA1.2.321073196.1726717630; terms.accept=1; disclaimer.collapsed=1; fundraiseup_stat=; fundraiseup_cid=17267926726896920669; fundraiseup_func={%22t%22:%22.icij.org%22%2C%22s%22:%221726792672692%22%2C%22sp%22:1}; _gcl_au=1.1.1834834721.1726792674; _ga_ZHK7PVGCC7=GS1.1.1726792674.1.0.1726792675.59.0.0; aws-waf-token=96db86b8-fdae-4747-bd3f-57da0c7b2176:EAoAvjMKuY8iAQAA:Ap+kMCz79KhcWAcJP5Ew36n6x+QruogaIqwg/qTFyZIzIwgZYRbBWUDbbrmDQiOGb6/tyeJPF1vitwt/eJ98VAGLtptmHWhKgN6Qj3h5zTNJCWp72zG47xB2SkXqObDrSVTmRqKhJ4y6CqM84VDB4rMO6ao9BnrSPmRgGFYrImoTi6nDAjhmV78pPrrcD0dsK3zQ0ALwruhr5VVyBeHYBbo=",
			dnt: "1",
			priority: "u=0, i",
			referer: "https://offshoreleaks.icij.org/search?q=Odebrecht&c=&j=&d=",
			"sec-ch-ua": '"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.104 Safari/537.36"',
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
