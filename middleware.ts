import createMiddleware from "next-intl/middleware";
import { routing } from "./routing";

export default createMiddleware(routing);

export const config = {
  // Spouštět middleware na všech cestách kromě:
  // - /api/* (API routes)
  // - /_next/* (Next.js interní soubory)
  // - /favicon.ico a jiné statické soubory s příponou
  matcher: [
    "/((?!api|_next|_vercel|favicon\\.ico|.*\\..*).*)",
  ],
};
