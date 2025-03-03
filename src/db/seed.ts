import {db} from './drizzle';
import { usersTable } from './schema';
import { saveCard } from '@/actions/vocabulary';
import { eq } from 'drizzle-orm';

async function main() {
  ['user1', 'user2', 'user3', 'user4'].forEach(async name => {
    await db.insert(usersTable).values({ name })
  })
  
  const user1 = await db.query.usersTable.findFirst({where: eq(usersTable.name, 'user1')});
  
  if (!user1) {
    throw new Error('Failed to insert users')
  }
  await saveCard(user1, 'cat', 'חתול');
  await saveCard(user1, 'dog', 'כלב');
  await saveCard(user1, 'why', 'למה');

  const user2 = await db.query.usersTable.findFirst({where: eq(usersTable.name, 'user2')});
  if (!user2) { throw new Error('Failed to get user2 ')};

  saveCard(user2, 'something', 'משהו');
  saveCard(user2, 'ring', 'טבעת');
}

main();
