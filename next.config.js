const rewrites = async () => {
    return [
        {
            source: '/api/:path*',
            destination: 'http://localhost:3001/api/:path*',
        },
    ];
};

const nextConfig = {
    async rewrites() {
        return rewrites();
    },
};

export default nextConfig;
