const server = "ftp.strato.de";
const user = "ftp_pk@lsd-berlin.de";
const password = "L$DBerlin2025";
const remotePath = "/www-lsd"; // dein Startverzeichnis laut Strato

const { execSync } = require("child_process");

try {
  console.log("🚀 Starte Upload zu Strato via FTP...");
  execSync(`
    lftp -e "
      set ftp:ssl-allow no;
      open -u ${user},${password} ftp://${server};
      mirror -R ./dist ${remotePath};
      quit
    "
  `, { stdio: "inherit" });
  console.log("✅ Upload erfolgreich abgeschlossen!");
} catch (error) {
  console.error("❌ Upload fehlgeschlagen:", error.message);
}
