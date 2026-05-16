import {
  pgTable,
  uuid,
  integer,
  varchar,
  text,
  numeric,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

export const userCredits = pgTable("user_credits", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().unique(),
  credits: integer("credits").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const paymentRecords = pgTable("payment_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  outTradeNo: varchar("out_trade_no", { length: 64 }).notNull().unique(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  creditsGranted: integer("credits_granted").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  payType: varchar("pay_type", { length: 20 }),
  tradeNo: varchar("trade_no", { length: 64 }),
  notifiedAt: timestamp("notified_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  title: varchar("title", { length: 200 }).notNull().default(""),
  description: text("description").notNull().default(""),
  questions: jsonb("questions"),
  documents: jsonb("documents"),
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type UserCredits = typeof userCredits.$inferSelect;
export type PaymentRecord = typeof paymentRecords.$inferSelect;
export type Project = typeof projects.$inferSelect;
