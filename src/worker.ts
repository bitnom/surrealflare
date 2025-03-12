import { Surreal } from 'surrealdb';
import { surrealdbNodeEngines } from '@surrealdb/node';

// Initialize SurrealDB with Node.js engine
const db = new Surreal({
  engines: surrealdbNodeEngines(),
});

export interface Env {}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // Parse the URL and route the request
    const url = new URL(request.url);
    const path = url.pathname;

    // Enable CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Initialize DB connection if not already connected
    if (!db.health) {
      await db.connect('mem://');
      await db.use({ ns: 'test', db: 'test' });
    }

    try {
      if (path === '/health') {
        return new Response(JSON.stringify({ status: 'ok' }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      else if (path === '/api/create' && request.method === 'POST') {
        const { table, data } = await request.json();
        const result = await db.create(table, data);
        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      else if (path === '/api/query' && request.method === 'POST') {
        const { query } = await request.json();
        const result = await db.query(query);
        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      else if (path.startsWith('/api/records/')) {
        const table = path.split('/').pop();
        const result = await db.select(table);
        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      return new Response('Not found', { status: 404, headers: corsHeaders });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  },
};