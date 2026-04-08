export const config = { runtime: 'edge' };

const SCRIPTS = {
  '1': 'https://script.google.com/macros/s/AKfycbzonl4uRis2jSjfu02fVwupID-B-J6T6URHhjdKxBOqO4B8Xb8OBQbQTyiXZKtvbvVT/exec',
  '2': 'https://script.google.com/macros/s/AKfycbzPeAehHaTh9bRQ8RQ5Me9PcRNGR3NlCfbK5gzkLdf4mOg_CaAc_0JCPvxjGpYB8vtgwA/exec'
};

export default async function handler(req) {
  const url = new URL(req.url);
  const sheet = url.searchParams.get('sheet') || '1';
  const scriptUrl = SCRIPTS[sheet] || SCRIPTS['1'];
  
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(
      `${scriptUrl}?nocache=${Date.now()}`,
      { signal: controller.signal, redirect: 'follow' }
    );
    clearTimeout(timeout);
    const data = await response.text();
    return new Response(data, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' },
    });
  } catch (e) {
    clearTimeout(timeout);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
