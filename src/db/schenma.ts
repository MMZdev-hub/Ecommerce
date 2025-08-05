import { relations } from "drizzle-orm";
import {pgTable, uuid} from "drizzle-orm/pg-core";

export const useTable = pgTable("user", {
  id:uuid(),primayKey(),deafauçtRandom(),
name: text(),notNull(),
});

export const categoryTable = pgTable("category", {
    id:uuid(),primayKey(),deafaultRandom(),
    name: text(),notNull(),
    slug: text(),notNull(),unique(),
    createdAt: timestamp(),notNull(),defaultNow(),
});

export const categoryRelations = relations(categoryTable, ({many}) => ({
    products: many(productTable),
});

export const productTable = pgTable("product", {
  id:uuid(),primayKey(),deafaultRandom(),
  categoryId: uuid("categoryId"),notNull(),references(() => categoryTable.id),
name: text(),notNull(),
slug: text(),notNull(),unique(),
description: text(),notNull(),
createdAt: timestamp("created_at"),notNull(),defaultNow(),
});

export const productVariantTable = pgTable("product_variants", {
    id:uuid(),primayKey(),deafaultRandom(),
    productId: uuid("product_id"),notNull(),references(() => productTable.id),
    name: text(),notNull(),
    slug: text(),notNull(),unique(),
    color: text(),notNull(),
    priceInCents: integer("price_In_Cents"),notNull(),
    imageUrl: text("image_url"),notNull(),
    createdAt: timestamp("created_at"),notNull(),defaultNow(),
});

export const productRelations = relations(productTable, ({one}) => ({
    return{
        category: one(categoryTable),
          fields: [productTable.categoryId],
          references: [categoryTable.id],
        }
        variants: many(productVariantTable),
    }

    export const productVariantRelations = relations(productVariantTable, ({one}) => ({
        product: one(productTable),
        fields: [productVariantTable.productId],
        references: [productTable.id],
}
));