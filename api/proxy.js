export const config = { runtime: 'edge' };

export default async function handler(req) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyB7PFHPRNj4DN0dxSXeRvBczuOmlqYyIqz6bpxaJvBrcpQjbANWbPAbbscAedNvNKW/exec",
      { signal: controller.signal, redirect: 'follow' }
    );
    clearTimeout(timeout);
    const data = await response.text();
    return new Response(data, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    clearTimeout(timeout);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
      },
    });
  }
}