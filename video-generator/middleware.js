// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) auth().protect()
// })

// export const config = {
//   matcher: [
   
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
   
//     '/(api|trpc)(.*)',
//   ],
// };
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req) => {
  if (!process.env.CLERK_SECRET_KEY) {
    console.error('Missing CLERK_SECRET_KEY');
  }

  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)', '/((?!sign-in|api|trpc|_next).*)',
  ],
};
