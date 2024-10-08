// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     env: {
//       CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
//     },
//   };
  
//   export default nextConfig;
  
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/dashboard',  // Adjusted path to your sign-in page
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;
  