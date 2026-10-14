export async function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://lsd-berlin.de/sitemap.xml
`,
    {
      headers: {
        "Content-Type": "text/plain",
        // Crawler fragen die Datei ständig ab: zwischenspeichern statt jedes Mal eine Funktion zu starten
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
