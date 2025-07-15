import ROUTES from "@/constants/ROUTES";
export const revalidate = 86400;
export const dynamic = "force-static";

export async function GET() {
  // Sitemap Index con alcune URL "inline" e alcune come rimandi ad altre sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
            <loc>${ROUTES.DEPLOYED_SITE}/alarm-clock.xml/</loc>
        </sitemap>
        <sitemap>
            <loc>${ROUTES.DEPLOYED_SITE}/circadian-clock.xml/</loc>
        </sitemap>
        <sitemap>
            <loc>${ROUTES.DEPLOYED_SITE}/lighting.xml/</loc>
        </sitemap>
        <sitemap>
            <loc>${ROUTES.DEPLOYED_SITE}/sounds.xml/</loc>
        </sitemap>
        <sitemap>
            <loc>${ROUTES.DEPLOYED_SITE}/timer.xml/</loc>
        </sitemap>
    </sitemapindex>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
