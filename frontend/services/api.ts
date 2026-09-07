const API_BASE_URL =
  (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_API_URL) || '';

function apiUrl(path: string) {
  if (API_BASE_URL) return `${API_BASE_URL.replace(/\/$/, '')}${path}`;
  return path;
}

export async function postProduct(product: any) {
  const res = await fetch(apiUrl('/api/products'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error(`Product API failed: ${res.status}`);
  return res.json();
}

export async function getAIInsights(product: any) {
  const res = await fetch(apiUrl('/api/ai/insights'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product }),
  });
  if (!res.ok) throw new Error(`AI API failed: ${res.status}`);
  return res.json();
}
