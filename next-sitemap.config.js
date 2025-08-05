/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: "https://dev-helperz.vercel.app",
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/",
			},
		],
		additionalSitemaps: ["https://dev-helperz.vercel.app/sitemap-0.xml"],
	},
	changefreq: "daily",
	priority: 0.7,
	sitemapSize: 5000,
	exclude: ["/api/*"],
};
