import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheLife: {
		hours: {
			stale: 3600,
			revalidate: 3600,
			expire: 7200,
		},
		frequent: {
			stale: 300,
			revalidate: 300,
			expire: 600,
		},
	},
};

export default nextConfig;
