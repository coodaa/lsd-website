const { execSync } = require("child_process");

const server = "ssh.strato.de";
const user = "ftp_pk@lsd-berlin.de";
const password = "LSDBERLIN2025!";
const remotePath = "/www-lsd"; // Strato Zielordner

try {
  console.log("🚀 Starte Upload zu STRATO via SFTP...");

  execSync(
    `lftp -e "
      set sftp:auto-confirm yes;
      open -u ${user},${password} sftp://${server};
      mirror -R ./dist ${remotePath};
      quit
    "`,
    { stdio: "inherit" }
  );

  console.log("✅ Upload erfolgreich abgeschlossen!");
} catch (error) {
  console.error("❌ Upload fehlgeschlagen:", error.message);
}
// asd/
