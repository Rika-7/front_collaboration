// server.js - ES module version
import { createServer } from "http";
import { parse } from "url";
import next from "next";

// Define environment variables with defaults
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

console.log(
  `Starting server in ${
    dev ? "development" : "production"
  } mode on port ${port}`
);
console.log("CWD:", process.cwd());

// Create Next.js app instance
const app = next({ dev, dir: process.cwd() });
const handle = app.getRequestHandler();

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
      console.log(`> Environment: ${process.env.NODE_ENV}`);
    });
  })
  .catch((err) => {
    console.error("Error preparing Next.js app:", err);
    console.error("Error details:", err.stack);
    process.exit(1);
  });
