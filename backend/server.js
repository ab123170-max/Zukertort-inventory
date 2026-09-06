'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const aiRoutes = require('./routes/ai');
const products = require('./routes/products');

let prisma;
let prismaInitError = null;
try {
  // Reuse Prisma client across serverless invocations to avoid exhausting connections
  // and to prevent PrismaClient from being recreated on every function call.
  prisma = global.prisma || new PrismaClient();
  if (!global.prisma) global.prisma = prisma;
} catch (err) {
  // Capture initialization errors so we can surface them in logs and to requests
  prismaInitError = err;
  console.error('Prisma initialization error:', err && err.stack ? err.stack : err);
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

// If Prisma failed to initialize, return a clear error for API requests so logs show it.
if (prismaInitError) {
  app.use('/api', (req, res) => {
    res.status(500).json({ error: 'Prisma initialization failed', details: String(prismaInitError) });
  });
} else {
  app.use('/api/products', products(prisma));
  app.use('/api/ai', aiRoutes());
}

// Global error handlers to surface unexpected crashes in logs
process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err && err.stack ? err.stack : err);
});
process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection', reason && reason.stack ? reason.stack : reason);
});

// Export the app always so serverless platforms can use it. When run directly (node server.js),
// start a local HTTP listener.
module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server running on ${port}`));
}
