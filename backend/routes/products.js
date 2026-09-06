const express = require('express');

module.exports = (prisma) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const data = req.body;
    try {
      const created = await prisma.product.create({ data });
      res.json(created);
    } catch (e) {
      console.error(e);
      res.status(500).send(String(e));
    }
  });

  router.get('/', async (req, res) => {
    const q = req.query.q || '';
    const filter = req.query.category || undefined;
    const where = {
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { brand: { contains: q, mode: 'insensitive' } },
        { category: { contains: q, mode: 'insensitive' } },
      ],
    };
    if (filter && filter !== 'All') where.category = filter;
    const items = await prisma.product.findMany({ where, orderBy: { createdAt: 'desc' } });
    res.json(items);
  });

  return router;
};
