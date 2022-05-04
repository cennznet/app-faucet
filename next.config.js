/** @type {import('next').NextConfig} */
const { version } = require("./package.json");
module.exports = {
	reactStrictMode: true,
	webpack: (config) => {
		config.module.rules.push({
			test: /\.(svg)$/i,
			type: "asset/resource",
		});

		return config;
	},
	eslint: {
		dirs: ["pages", "libs/components", "libs/providers"],
	},
	env: {
		APP_VERSION: version,
	},
};
