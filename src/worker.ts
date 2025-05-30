// Workaround for Cloudflare Workers: manually set import.meta.url
// This fixes the "new URL('index_bg.wasm', import.meta.url)" issue in @surrealdb/wasm
// Set this before any imports to ensure it's available when WASM tries to load
if (!(import.meta as any).url) {
  (import.meta as any).url = 'file:///app/';
}

import { Surreal } from 'surrealdb';

// Create SurrealDB instance with WASM engine
let db: Surreal | null = null;

// Explicitly handle database initialization
async function initDb() {
  if (db) return db;
  
  try {
    console.log('Initializing SurrealDB with WASM engines');
    
    // Try to import and use WASM engines
    try {
      const { surrealdbWasmEngines } = await import('@surrealdb/wasm');
      console.log('WASM engines imported successfully');
      
      db = new Surreal({
        engines: surrealdbWasmEngines(),
      });
      console.log('SurrealDB instance created with WASM engines');
    } catch (wasmError) {
      console.log('WASM engine failed, trying without engines:', wasmError);
      // Fallback: try without specifying engines
      db = new Surreal();
    }
    
    // Connect to in-memory database
    console.log('Connecting to in-memory database');
    await db.connect('mem://');
    console.log('Connected to mem:// successfully');
    
    // Use a specific namespace and database
    await db.use({ namespace: 'test', database: 'test' });
    console.log('Using namespace and database: test/test');
    
    return db;
  } catch (error) {
    console.error('SurrealDB initialization error:', error);
    throw error;
  }
}

export interface Env {}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    try {
      console.log('Handling request');
      
      // Initialize database
      const database = await initDb();
      
      // Example usage - create a test record
      await database.create('person', {
        name: 'John Doe',
        age: 30,
        email: 'john@example.com'
      });
      
      // Query the data
      const result = await database.query('SELECT * FROM person');
      
      return new Response(JSON.stringify({ 
        status: 'success',
        message: 'SurrealDB WASM working in Cloudflare Workers!',
        data: result 
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
      
    } catch (error) {
      console.error('Request handling error:', error);
      return new Response(JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  },
};