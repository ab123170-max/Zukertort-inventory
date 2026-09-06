export async function postProduct(product: any) {
  const res = await fetch('http://localhost:4000/api/products', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function getAIInsights(product: any) {
  const res = await fetch('http://localhost:4000/api/ai/insights', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ product }),
  });
  return res.json();
}
