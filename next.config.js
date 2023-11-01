/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		serverActions: true,
	},
	images: {
		domains: ["m.media-amazon.com", "example.com", "i.ibb.co", "ibb.co", "www.w3.org"]
	}
};

module.exports = nextConfig;
