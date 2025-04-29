import { clerkMiddleware } from "@clerk/nextjs/server";

// Apply Clerk middleware globally, for all routes including API
export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Explicitly allow API routes
    '/api/(.*)',  // This includes '/api/uploadthing' and all other API routes
  ],
};
