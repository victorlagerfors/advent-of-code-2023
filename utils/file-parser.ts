import { readFileSync } from "fs";

export function readFileToString(path: string): string {
  return readFileSync(path, "utf8");
}
