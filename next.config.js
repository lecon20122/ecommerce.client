const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const pwa = withPWA({
	pwa: {
		disable: process.env.NODE_ENV !== "production",
		dest: "public",
		runtimeCaching,
	},
	images: {
		domains: ['127.0.0.1'],
	  },
	i18n,
	typescript: {
    ignoreBuildErrors: true,
  },
})
module.exports = withPWA({
	pwa: {
		disable: process.env.NODE_ENV !== "production",
		dest: "public",
		runtimeCaching,
	},
	images: {
		domains: ['127.0.0.1','167.71.42.19'],
	  },
	i18n,
	typescript: {
    ignoreBuildErrors: true,
  },
})
