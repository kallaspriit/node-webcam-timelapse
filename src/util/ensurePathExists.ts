import fs from "fs";
import path from "path";

export function ensurePathExists(inputPath: string): void {
  const absolutePath = path.resolve(inputPath);

  if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath, { recursive: true });
  }
}
