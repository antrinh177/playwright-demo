import { readFileSync } from "node:fs";
import { join } from "node:path";

const users: Record<string, Record<string, string>> = JSON.parse(
  readFileSync(join(__dirname, "users.json"), "utf8")
);

export function getTestDataValue(path: string): string {
  const [userKey, field, ...extra] = path.split(".");

  if (!userKey || !field || extra.length > 0) {
    throw new Error(`Invalid test data path: "${path}"`);
  }

  const value = users[userKey]?.[field];
  if (typeof value !== "string") {
    throw new Error(`No test data value found for "${path}"`);
  }

  return value;
}