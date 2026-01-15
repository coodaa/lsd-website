export async function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://lsd-berlin.de/sitemap.xml
`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
