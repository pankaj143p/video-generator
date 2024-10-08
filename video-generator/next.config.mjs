/** @type {import('next').NextConfig} */
const nextConfig = {};
// next.config.js
module.exports = {
    env: {
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    },
  };
  
export default nextConfig;
