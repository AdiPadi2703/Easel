import { clerkMiddleware , createRouteMatcher } from "@clerk/nextjs/server";

const routes_for_signed_users = createRouteMatcher(['/Gallery(.*)', '/Posts(.*)']);
const routes_for_admin_only = createRouteMatcher(['/Admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (routes_for_signed_users(req)) 
    {
      await auth.protect();
    }
  
  if(routes_for_admin_only(req))
  {
    await auth.protect((has) => {
      return (
        has({ permission: 'org:sys_memberships:manage' }) ||
        has({ permission: 'org:sys_domains_manage' })
      )
    })
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};