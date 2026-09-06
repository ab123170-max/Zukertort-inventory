const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const aiRoutes = require('./routes/ai');
const products = require('./routes/products');

// Reuse Prisma client across serverless invocations to avoid exhausting connections
// and to prevent PrismaClient from being recreated on every function call.
const prisma = global.prisma || new PrismaClient();
if (!global.prisma) global.prisma = prisma;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', products(prisma));
app.use('/api/ai', aiRoutes());

// In serverless (Vercel) export the app so the platform provides the HTTP server.
// When running locally, start the listener so `npm start` still works.
if (process.env.VERCEL) {
  module.exports = app;
} else {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server running on ${port}`));
}
