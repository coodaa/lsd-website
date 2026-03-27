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
  // Variante 1: <a><img></a> (klassisch + Gutenberg mit direktem Link)
  s = s.replace(/<a[^>]*>\s*(<img[^>]+>)\s*<\/a>/gi, "$1");
  // Variante 2: <a><figure>...</figure></a> (Gutenberg block-level)
  s = s.replace(/<a[^>]*>\s*(<figure[\s\S]*?<\/figure>)\s*<\/a>/gi, "$1");
  // Variante 3: <a><picture>...</picture></a>
  s = s.replace(/<a[^>]*>\s*(<picture[\s\S]*?<\/picture>)\s*<\/a>/gi, "$1");

  return s;
}

export function getFirstImage(html = "") {
  if (!html) return null;
  const match = html.match(/<img[^>]+src="([^">]+)"/i);
  return match ? match[1] : null;
}

export function getDescription(html = "", maxLength = 160) {
  if (!html) return "";
  const text = fix(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}

/**
 * Menü-Titel aufteilen: Bullet (z.B. "•") getrennt vom Text,
 * damit nur der Text unterstrichen werden kann.
 */
export function splitMenuTitle(str = "") {
  const cleaned = fix(str)
    .replace(/<[^>]*>/g, "")
    .trim();

  // Erlaubte "Bullet"-Zeichen am Anfang (inkl. gängigen Varianten)
  const match = cleaned.match(/^\s*([•·▪▫◦‣∙])\s*(.+)$/u);

  if (match) {
    return { bullet: match[1], text: match[2] };
  }

  return { bullet: "", text: cleaned };
}
