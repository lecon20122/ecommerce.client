const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
	pwa: {
		disable: process.env.NODE_ENV !== "production",
		dest: "public",
		runtimeCaching,
	},
	images: {
		domains: ['127.0.0.1', 'localhost', 'store.modaje.com'],
	},
	i18n,
	typescript: {
		ignoreBuildErrors: true,
	},
})
