console.log("Starting server.js");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("CWD:", process.cwd());
import { readdirSync } from "fs";

try {
  // Node.js doesn't have Deno.readDirSync, so let's use Node's fs instead
  console.log("Files in directory:", readdirSync("./").join(", "));
} catch (e) {
  console.log("Could not list files:", e.message);
}

import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Create equivalent of __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create the Next.js app
const app = next({
  dev: process.env.NODE_ENV !== "production",
  dir: __dirname,
});
const handle = app.getRequestHandler();

// Get port from environment variable
const port = process.env.PORT || 3000;

// Prepare the app and start the server
app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      // Parse the URL
      const parsedUrl = parse(req.url, true);

      // Let Next.js handle the request
      handle(req, res, parsedUrl);
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
      console.log(`> Environment: ${process.env.NODE_ENV}`);
    });
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    console.error("Error details:", err.stack);
    process.exit(1);
  });
