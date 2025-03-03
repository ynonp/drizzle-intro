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

export async function findUserById(userId: number): Promise<SelectUser> {
  const user = await db.query.usersTable.findFirst({where: eq(usersTable.id, userId)});
  if (!user) {
    throw new Error(`User not found: ${userId}`);
  }
  return user;
}

export async function findUserByName(userName: string): Promise<SelectUser> {
  const user = await db.query.usersTable.findFirst({where: eq(usersTable.name, userName)});
  if (!user) {
    throw new Error(`User not found: ${userName}`);
  }
  return user;
}
  

export async function listCards(user: SelectUser) {
  return db.select().from(vocabularyCardsTable).where(eq(vocabularyCardsTable.userId, user.id));
}
