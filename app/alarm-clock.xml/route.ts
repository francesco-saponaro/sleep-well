import ROUTES from "@/constants/ROUTES";

export const revalidate = 86400; // 1 day
export const dynamic = "force-static";

export async function GET() {
  const lastmod = new Date().toISOString(); // Use current timestamp for static content

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${ROUTES.DEPLOYED_SITE}/alarm-clock</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
