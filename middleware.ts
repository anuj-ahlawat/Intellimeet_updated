import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Protected routes that require authentication
const protectedRoute = createRouteMatcher([
  '/upcoming',
  '/meeting(.*)',
  '/previous',
  '/recordings',
  '/personal-room',
]);

// Public routes that don't require authentication
const publicRoutes = createRouteMatcher([
  '/landing(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sso-callback(.*)',
  '/api/webhook(.*)',
  '/dashboard(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // Skip authentication for public routes
  if (publicRoutes(req)) {
    return;
  }
  
  // Protect authenticated routes
  if (protectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

