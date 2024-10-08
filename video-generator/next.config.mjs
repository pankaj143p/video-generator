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
          destination: '/sign-in',  // Adjusted path to your sign-in page
          permanent: false,
        },
      ];
    },
  };
  
  export default nextConfig;
  