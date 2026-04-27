/**
 * DinnerBoard Cloudflare Worker
 * 
 * Setup:
 * 1. Create a KV namespace named DINNERBOARD in your Cloudflare dashboard
 * 2. Bind it to this Worker as DINNERBOARD
 * 3. Set an environment variable: AUTH_TOKEN = some random string you make up
 *    (e.g. run: openssl rand -hex 24   to generate one)
 * 4. Deploy with: wrangler deploy
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
};

const STATE_KEY = 'dinnerboard_state';

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    // Auth check
    const token = request.headers.get('X-Auth-Token');
    if (!token || token !== env.AUTH_TOKEN) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(request.url);

    // GET /state — return current state
    if (request.method === 'GET' && url.pathname === '/state') {
      const data = await env.DINNERBOARD.get(STATE_KEY);
      if (!data) {
        // Return empty initial state
        return new Response(JSON.stringify({ meals: {}, grocery: [], theme: 'light' }), {
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }
      return new Response(data, {
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    // PUT /state — save new state
    if (request.method === 'PUT' && url.pathname === '/state') {
      const body = await request.text();
      // Basic validation — must be valid JSON
      try {
        JSON.parse(body);
      } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }
      await env.DINNERBOARD.put(STATE_KEY, body);
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  },
};