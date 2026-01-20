// src/server.js
import "dotenv/config";   // 🔥 MUST be first

import app from "./app.js";

app.listen({ port: process.env.PORT || 3033 }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
