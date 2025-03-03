import 'dotenv/config';
import * as vocabulary from '@/actions/vocabulary';
import {db} from '@/db/drizzle';
import { usersTable, vocabularyCardsTable } from './db/schema';
import { isNull, eq } from 'drizzle-orm';

async function main() {
  const usersWithWords = await db.query.usersTable.findFirst({
    with: {
      words: true
    }
  })
  console.log(usersWithWords);

  // const user1 = await vocabulary.getUser(1);
  // const words = await vocabulary.listCards(user1!);
  
  // console.log(words);

  const usersWithoutCards = await db
    .select()
    .from(usersTable)
    .leftJoin(vocabularyCardsTable, eq(usersTable.id, vocabularyCardsTable.userId))
    .where(isNull(vocabularyCardsTable.id))
    .then(rows => rows.map(row => row.users));

  console.log(usersWithoutCards);
}

main();