import type { AstroGlobal } from "astro";

export const setCache = {
  // For static content that rarely changes (categories, designers, series pages)
  static: (Astro: AstroGlobal) => {
    Astro.response.headers.set(
      "Cache-Control",
      "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400"
    );
  },

  // For semi-static content (product listings)
  long: (Astro: AstroGlobal) => {
    Astro.response.headers.set(
      "Cache-Control",
      "public, max-age=300, s-maxage=3600, stale-while-revalidate=7200"
    );
  },

  // For dynamic content (product details with inventory)
  medium: (Astro: AstroGlobal) => {
    Astro.response.headers.set(
      "Cache-Control",
      "public, max-age=60, s-maxage=300, stale-while-revalidate=600"
    );
  },

  // For highly dynamic content (cart, user-specific pages)
  short: (Astro: AstroGlobal) => {
    Astro.response.headers.set(
      "Cache-Control",
      "public, max-age=10, s-maxage=60, stale-while-revalidate=120"
    );
  },

  // For content that should not be cached
  none: (Astro: AstroGlobal) => {
    Astro.response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
  },
};
