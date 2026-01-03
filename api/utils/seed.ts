// 数据库初始化脚本
import { db } from './db';
import { products } from '../../shared/schema';

export async function seedProducts() {
  try {
    // 清空现有产品数据
    await db.delete(products);
    
    // 插入初始产品数据
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
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}