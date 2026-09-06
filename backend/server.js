const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const aiRoutes = require('./routes/ai');
const products = require('./routes/products');

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', products(prisma));
app.use('/api/ai', aiRoutes());

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on ${port}`));
