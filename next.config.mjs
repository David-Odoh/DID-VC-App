/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_SENDER_ADDRESS: process.env.NEXT_PUBLIC_SENDER_ADDRESS,
      },
};

export default nextConfig;
