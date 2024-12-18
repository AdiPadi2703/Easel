import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const routes_for_signed_users = createRouteMatcher([
  "/Posts(.*)",
  "/CreatePage(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (routes_for_signed_users(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
