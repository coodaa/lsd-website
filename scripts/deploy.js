import { execSync } from "child_process";
import { existsSync } from "fs";

console.log("🚀 Deploy started...");

// 1. Build ausführen
console.log("🔨 Running build...");
execSync("npm run build", { stdio: "inherit" });

// 2. Prüfen, ob dist existiert
if (!existsSync("dist")) {
  console.error("❌ Kein dist/ Ordner gefunden!");
  process.exit(1);
}

// 3. LFTP Upload via Shell-Befehl ausführen
console.log("📤 Uploading via lftp...");

execSync(`
  lftp -u ftp_pk@lsd-berlin.de,LSDBERLIN2025! sftp://ssh.strato.de <<EOF
  cd /www-lsd
  mirror -R dist .
  bye
EOF
`, { stdio: "inherit" });

console.log("✅ Deployment abgeschlossen!");

