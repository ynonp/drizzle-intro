import { integer, sqliteTable, text} from "drizzle-orm/sqlite-core";
import { sql, relations } from 'drizzle-orm';

export const usersTable = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});

// Define the vocabulary cards table
export const vocabularyCardsTable = sqliteTable('vocabulary_cards', {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: integer().notNull().references(() => usersTable.id),
  front: text().notNull(),
  back: text().notNull(),    
  nextReviewDate: text().notNull(),    
  createdAt: text().notNull().default(sql`(current_timestamp)`),
  updatedAt: text().notNull().default(sql`(current_timestamp)`),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  words: many(vocabularyCardsTable)
}));

export const vocabularyCardsRelations = relations(vocabularyCardsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [vocabularyCardsTable.userId],
    references: [usersTable.id]
  })
}))

export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;
