import { Surreal } from 'surrealdb';
import { surrealdbWasmEngines } from '@surrealdb/wasm';

// Create SurrealDB instance with WASM engine
let db: Surreal | null = null;

// Explicitly handle database initialization
async function initDb() {
  if (db && db.health) return db;
  
  try {
    console.log('Initializing SurrealDB with WASM engine');
    // Initialize the DB with WASM engine
    db = new Surreal({
      engines: surrealdbWasmEngines(),
    });
    
    // Use proper URL construction for connection
    const connectionUrl = new URL('mem://');
    console.log(`Connecting to in-memory database with ${connectionUrl.toString()}`);
    
    await db.connect(connectionUrl);  // toString() doesn't help
    console.log('Connected to in-memory database');
    
    // Use a specific namespace and database
    await db.use({ ns: 'test', db: 'test' });
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
    console.log('Handling request');
    
  },
};