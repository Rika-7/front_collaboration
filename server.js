const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

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
    });
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
