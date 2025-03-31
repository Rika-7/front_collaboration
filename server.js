// server.js - ES module version
console.log("Starting server.js (ES module version)...");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("CWD:", process.cwd());

// ES module imports
import { createServer } from "http";
import { parse } from "url";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import * as fs from "fs";
import next from "next";

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  console.log("Files in directory:", fs.readdirSync(".").join(", "));
} catch (e) {
  console.log("Could not list files:", e.message);
}

// Wrap everything in an async function for better error handling
const startServer = async () => {
  try {
    const port = process.env.PORT || 3000;
    const dev = process.env.NODE_ENV !== "production";

    console.log(
      `Starting server in ${dev ? "development" : "production"} mode`
    );

    // Check for standalone directory
    const standaloneDir = join(".next", "standalone");
    if (fs.existsSync(standaloneDir)) {
      console.log("Standalone directory exists at:", standaloneDir);
      console.log("Contents:", fs.readdirSync(standaloneDir).join(", "));

      try {
        // Import the standalone server (ES modules approach)
        console.log("Trying to load standalone server...");
        const standaloneServerPath = join(
          process.cwd(),
          ".next",
          "standalone",
          "server.js"
        );
        console.log("Standalone server path:", standaloneServerPath);

        // Dynamic import of the standalone server
        await import(standaloneServerPath);
        return; // Exit if successful
      } catch (e) {
        console.error("Failed to load standalone server:", e.message, e.stack);
        console.log("Falling back to custom server...");
      }
    } else {
      console.log("No standalone directory found - using custom server");
    }

    // Create custom Next.js server
    const app = next({ dev, dir: __dirname });
    const handle = app.getRequestHandler();

    console.log("Preparing Next.js app...");
    try {
      await app.prepare();
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
        console.log(`> Environment: ${process.env.NODE_ENV}`);
      });
    } catch (err) {
      console.error("Error preparing Next.js app:", err);
      console.error("Error details:", err.stack);
      process.exit(1);
    }
  } catch (err) {
    console.error("Fatal error:", err);
    console.error("Error details:", err.stack);
    process.exit(1);
  }
};

// Start the server
startServer().catch((err) => {
  console.error("Unhandled server startup error:", err);
  process.exit(1);
});
