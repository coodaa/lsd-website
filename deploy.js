import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function run(cmd) {
  console.log("👉 ", cmd);
  execSync(cmd, { stdio: "inherit" });
}

// 1. Build
console.log("📦 Building project...");
run("npm run build");

// 2. Upload via LFTP
console.log("🚀 Deploying via lftp...");

const distPath = path.join(__dirname, "..", "dist");

const LFTP_COMMAND = `
open -u ftp_pk@lsd-berlin.de,LSDBERLIN2025! sftp://ssh.strato.de <<EOF
cd /www-lsd
rm -rf *
lcd ${distPath}
mirror -R .
bye
EOF
`;

run(`bash -c '${LFTP_COMMAND}'`);

console.log("✅ Deployment finished!");
