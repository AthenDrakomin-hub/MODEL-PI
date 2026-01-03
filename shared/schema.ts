import { pgTable, text, serial, integer, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  price: numeric("price").notNull(),
  deposit: numeric("deposit").notNull(),
  stock: integer("stock").notNull(),
  image: text("image").notNull(),
  isLimited: boolean("is_limited").default(false),
  logistics: text("logistics").notNull(),
});

// Cart items table (persisted cart)
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(), // Simple session tracking
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
});

// Schemas
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true });

// Types
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
