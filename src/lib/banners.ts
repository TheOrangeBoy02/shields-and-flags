import fs from "fs";
import path from "path";

export interface Banner {
  src: string;
  alt: string;
}

const BANNERS_DIR = path.join(process.cwd(), "public", "banners");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg"]);

// Turn "standard-bank-fikani.png" into "Standard Bank Fikani".
function altFromFilename(file: string): string {
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Reads every image in public/banners/ at request time so the carousel
 * picks up any file dropped into that folder — no per-file wiring needed.
 */
export function getBanners(): Banner[] {
  let files: string[];
  try {
    files = fs.readdirSync(BANNERS_DIR);
  } catch {
    return [];
  }

  return files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      src: `/banners/${file}`,
      alt: altFromFilename(file),
    }));
}
