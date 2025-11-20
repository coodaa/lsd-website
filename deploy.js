const { execSync } = require("child_process");

try {
  console.log("🚀 Starte Upload zu Strato via SFTP...");
  execSync(
    `lftp -e "
      set sftp:auto-confirm yes;
      open -u ftp_pk@lsd-berlin.de,LSDBERLIN2025! sftp://ssh.strato.de;
      mirror -R ./dist /;
      quit
    "`,
    { stdio: "inherit" }
  );
  console.log("✅ Upload erfolgreich abgeschlossen!");
} catch (error) {
  console.error("❌ Upload fehlgeschlagen:", error.message);
}
// jsd
