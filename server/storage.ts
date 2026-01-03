import { db } from "./db";
import { products, cartItems, type Product, type InsertProduct, type CartItem, type InsertCartItem } from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  syncCart(sessionId: string, items: { productId: number; quantity: number }[]): Promise<void>;
  seedProducts(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = await db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
    
    // Join with products manually or via query
    const result = [];
    for (const item of items) {
      const product = await this.getProduct(item.productId);
      if (product) {
        result.push({ ...item, product });
      }
    }
    return result;
  }

  async syncCart(sessionId: string, items: { productId: number; quantity: number }[]): Promise<void> {
    // Clear existing cart for session (simple sync approach)
    await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
    
    if (items.length > 0) {
      await db.insert(cartItems).values(
        items.map(item => ({
          sessionId,
          productId: item.productId,
          quantity: item.quantity,
        }))
      );
    }
  }

  async seedProducts(): Promise<void> {
    // Always clear and re-seed to match the latest requirements
    await db.delete(products);
    
    await db.insert(products).values([
      {
        name: "Model π Standard",
        color: "Pearl White",
        price: "299",
        deposit: "89.70",
        stock: 40000,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
        isLimited: false,
        logistics: "Global Free Air Shipping (7-15 business days)",
      },
      {
        name: "Model π Standard",
        color: "Starry Purple",
        price: "359",
        deposit: "107.70",
        stock: 11000,
        image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=800&auto=format&fit=crop",
        isLimited: false,
        logistics: "Global Free Air Shipping (7-15 business days)",
      },
      {
        name: "Model π Standard",
        color: "Flame Orange",
        price: "359",
        deposit: "107.70",
        stock: 11000,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
        isLimited: false,
        logistics: "Global Free Air Shipping (7-15 business days)",
      },
      {
        name: "Model π Standard",
        color: "Deep Sea Blue",
        price: "359",
        deposit: "107.70",
        stock: 11000,
        image: "https://images.unsplash.com/photo-1556656793-0275b2920d49?q=80&w=800&auto=format&fit=crop",
        isLimited: false,
        logistics: "Global Free Air Shipping (7-15 business days)",
      },
      {
        name: "Model π Standard",
        color: "Flame Red",
        price: "359",
        deposit: "107.70",
        stock: 11000,
        image: "https://images.unsplash.com/photo-1535303311164-664fc9ec003e?q=80&w=800&auto=format&fit=crop",
        isLimited: false,
        logistics: "Global Free Air Shipping (7-15 business days)",
      },
      {
        name: "Model π Standard",
        color: "Forest Green",
        price: "359",
        deposit: "107.70",
        stock: 11000,
        image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&auto=format&fit=crop",
        isLimited: false,
        logistics: "Global Free Air Shipping (7-15 business days)",
      },
      {
        name: "Model π Fold (Limited AI Edition)",
        color: "Black Silver",
        price: "799",
        deposit: "239.70",
        stock: 5000,
        image: "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?q=80&w=800&auto=format&fit=crop",
        isLimited: true,
        logistics: "Priority Air Shipping (5-10 business days)",
      },
    ]);
  }
}

export const storage = new DatabaseStorage();
