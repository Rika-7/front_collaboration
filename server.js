// server.js - ES Module version
console.log("Starting server.js...");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("CWD:", process.cwd());

import { createServer } from "http";
import { parse } from "url";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import next from "next";

try {
  console.log("Files in directory:", fs.readdirSync(".").join(", "));
} catch (e) {
  console.log("Could not list files:", e.message);
}

// Create equivalent of __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if Next.js is installed
try {
  console.log("Checking for Next.js...");
  await import("next");
} catch (e) {
  console.error("Error importing Next.js:", e.message);
  process.exit(1);
}

// Check for standalone directory
const standaloneDir = join(".next", "standalone");
if (fs.existsSync(standaloneDir)) {
  console.log("Standalone directory exists - using standalone server");
  // We need to dynamically import the standalone server
  try {
    const standaloneServerPath = join(
      process.cwd(),
      ".next",
      "standalone",
      "server.js"
    );
    console.log(
      "Trying to import standalone server from:",
      standaloneServerPath
    );
    await import(standaloneServerPath);
  } catch (e) {
    console.error("Failed to import standalone server:", e.message);
    console.log("Falling back to custom server...");
    startCustomServer();
  }
} else {
  console.log("No standalone directory found - starting custom server");
  startCustomServer();
}

// Function to start a custom Next.js server
function startCustomServer() {
  const dev = process.env.NODE_ENV !== "production";
  const port = process.env.PORT || 3000;

  console.log(
    "Starting custom Next.js server in",
    dev ? "development" : "production",
    "mode"
  );

  const app = next({ dev, dir: __dirname });
  const handle = app.getRequestHandler();

  console.log("Preparing Next.js app...");
  app
    .prepare()
    .then(() => {
      console.log("Next.js app prepared, starting HTTP server...");
      createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      }).listen(port, (err) => {
        if (err) {
          console.error("Error starting server:", err);
          throw err;
        }
        console.log(`> Ready on http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.error("Error starting Next.js:", err);
      process.exit(1);
    });
}
