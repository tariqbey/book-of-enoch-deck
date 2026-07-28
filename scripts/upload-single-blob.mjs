import { put } from "@vercel/blob";
import { readFile } from "node:fs/promises";
import path from "node:path";

const filePath = process.env.FILE_PATH;
const blobPath = process.env.BLOB_PATH;

if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error("BLOB_READ_WRITE_TOKEN is required.");
if (!filePath || !blobPath) throw new Error("FILE_PATH and BLOB_PATH are required.");

const body = await readFile(path.resolve(filePath));
const blob = await put(blobPath, body, {
  access: "public",
  allowOverwrite: true,
  cacheControlMaxAge: 60 * 60 * 24 * 30,
  token: process.env.BLOB_READ_WRITE_TOKEN,
});

console.log(blob.url);
