import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
});

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  categoryId: text('category_id').references(() => categories.id),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  price: real('price').notNull(),
  stock: integer('stock').notNull().default(0),
  imageUrl: text('image_url'),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
});

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  customerName: text('customer_name').notNull(),
  customerEmail: text('customer_email').notNull(),
  totalAmount: real('total_amount').notNull(),
  status: text('status').notNull().default('pending'), // pending, paid, shipped
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
});

export const categoryRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));
