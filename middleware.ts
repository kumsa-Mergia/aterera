import { clerkMiddleware } from "@clerk/nextjs/server";

// Clerk middleware applied globally for all API routes
export default clerkMiddleware();

export const config = {
  matcher: [
    // This will match any routes that start with /api/ including /api/uploadthing
    '/api/(.*)', // Matches everything under '/api/', including the uploadthing route
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
