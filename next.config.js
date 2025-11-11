/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["m.media-amazon.com", "example.com", "i.ibb.co", "ibb.co", "www.w3.org", "gravatar.com", "i.imgur.com", "imgur.com"]
	}
};

module.exports = nextConfig;
