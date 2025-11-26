// HTML-Entities decodieren + Bildlinks bereinigen

export function fix(str = "") {
  if (!str) return "";

  let s = String(str);

  const entityMap = {
    "&auml;": "ä",
    "&ouml;": "ö",
    "&uuml;": "ü",
    "&Auml;": "Ä",
    "&Ouml;": "Ö",
    "&Uuml;": "Ü",
    "&szlig;": "ß",
    "&quot;": '"',
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&nbsp;": " ",
  };

  s = s.replace(
    /&(auml|ouml|uuml|Auml|Ouml|Uuml|szlig|quot|amp|lt|gt|nbsp);/g,
    (match) => entityMap[match] ?? match
  );

  // numerische Entities (dezimal)
  s = s.replace(/&#(\d+);/g, (_, dec) =>
    String.fromCharCode(parseInt(dec, 10))
  );

  // numerische Entities (hex)
  s = s.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );

  // WP umschließt Bilder oft mit <a>...</a> → entfernen
  s = s.replace(/<a[^>]*>\s*(<img[^>]+>)\s*<\/a>/gi, "$1");

  return s;
}

export function getFirstImage(html = "") {
  if (!html) return null;
  const match = html.match(/<img[^>]+src="([^">]+)"/i);
  return match ? match[1] : null;
}
