import { Pool, PoolConfig } from 'pg';

export class DbContext {
  private pool: Pool;

  constructor(config: PoolConfig) {
    this.pool = new Pool(config);
  }

  async checkConnection(): Promise<void> { 
    try {
      const client = await this.pool.connect();
      try {
        await client.query('SELECT NOW()');
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }
  
  async close(): Promise<void> {
    try {
      await this.pool.end();
    } catch (error) {
      console.error('Error closing the database pool:', error);
      throw error;
    }
  }
}


