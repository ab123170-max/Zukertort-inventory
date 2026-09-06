# Backend README

This backend is a simple Express server with Prisma (SQLite) and endpoints for products and AI insights.

Setup
1. cd backend
2. cp .env.example .env and set OPENAI_API_KEY (if you want AI) and DATABASE_URL
3. npm install
4. npx prisma migrate dev --name init
5. npm run dev

Endpoints
- POST /api/products  -> create product
- GET  /api/products  -> list/search products
- POST /api/ai/insights -> AI insights (proxies to OpenAI)
