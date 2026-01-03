// Vercel API Route for cart by session ID
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../../utils/db';
import * as schema from '../../../shared/schema';
import { eq, and } from 'drizzle-orm';

// 定义类型
interface CartItemWithProduct {
  id: number;
  sessionId: string;
  productId: number;
  quantity: number;
  product: typeof schema.products.$inferSelect;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end();
    return;
  }

  const { sessionId } = req.query;

  if (typeof sessionId !== 'string' || !sessionId) {
    return res.status(400).json({ message: 'Session ID is required' });
  }

  if (req.method === 'GET') {
    try {
      // 获取购物车项目
      const cartItems = await db
        .select()
        .from(schema.cartItems)
        .where(eq(schema.cartItems.sessionId, sessionId));

      // 获取相关产品信息
      const result: CartItemWithProduct[] = [];
      for (const item of cartItems) {
        const [product] = await db
          .select()
          .from(schema.products)
          .where(eq(schema.products.id, item.productId));
        
        if (product) {
          result.push({ 
            id: item.id,
            sessionId: item.sessionId,
            productId: item.productId,
            quantity: item.quantity,
            product: product
          });
        }
      }

      res.status(200).json(result);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to fetch cart items' });
    }
  } else if (req.method === 'POST') {
    try {
      const { items } = req.body;

      if (!Array.isArray(items)) {
        return res.status(400).json({ message: 'Items must be an array' });
      }

      // 清除现有购物车项目
      await db
        .delete(schema.cartItems)
        .where(eq(schema.cartItems.sessionId, sessionId));

      // 如果有项目，则插入新项目
      if (items.length > 0) {
        await db.insert(schema.cartItems).values(
          items.map(item => ({
            sessionId,
            productId: item.productId,
            quantity: item.quantity,
          }))
        );
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to sync cart' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}