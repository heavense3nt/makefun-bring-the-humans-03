// Bring the humans 03 — entry program.
//
// The ad itself lives on TikTok as a public video; this program only hands
// the video's address to the grader. It reads VIDEO.json from the
// repository root, checks it names a TikTok video address, and copies it
// into the output directory. It writes nothing else.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

const source = join(repoRoot, "VIDEO.json");
const destinationDir = join(repoRoot, botDir, outputDir);
const destination = join(destinationDir, "VIDEO.json");

if (!existsSync(source)) {
  throw new Error("VIDEO.json is missing from the repository root");
}

const parsed = JSON.parse(readFileSync(source, "utf8"));
if (
  typeof parsed !== "object" ||
  parsed === null ||
  typeof parsed.url !== "string" ||
  !parsed.url.startsWith("https://www.tiktok.com/")
) {
  throw new Error("VIDEO.json must name a TikTok video address in its url field");
}

mkdirSync(destinationDir, { recursive: true });
copyFileSync(source, destination);
