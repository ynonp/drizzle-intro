import {db} from '@/db/drizzle';
import { SelectUser, vocabularyCardsTable, usersTable } from '@/db/schema';
import { sql, eq } from 'drizzle-orm';

export async function saveCard(user: SelectUser, front: string, back: string) {
  return db.insert(vocabularyCardsTable).values({
    userId: user.id,
    front,
    back,
    nextReviewDate: sql`current_timestamp`
  })
}

export async function listCards(user: SelectUser) {
  return db.select().from(vocabularyCardsTable).where(eq(vocabularyCardsTable.userId, user.id));
}

export async function getUser(userId: number) {
  return db.query.usersTable.findFirst({where: eq(usersTable.id, userId)});
}