// 数据库连接工具，用于Vercel Serverless Functions
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../../shared/schema';

// 为Serverless环境优化连接池
const globalForPool = global as unknown as { 
  pool: Pool | null 
};

let pool: Pool;

if (process.env.NODE_ENV === "production") {
  // 生产环境：使用全局池避免重复创建
  if (!globalForPool.pool) {
    globalForPool.pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      max: 10, // 限制连接数以适应Serverless环境
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  pool = globalForPool.pool;
} else {
  // 开发环境：每次都创建新池
  pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
}

export const db = drizzle(pool, { schema });

// 导出pool以供显式关闭（在Serverless环境中可能有用）
export { pool };