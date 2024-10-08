// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    },
  };
  
  export default nextConfig;
  