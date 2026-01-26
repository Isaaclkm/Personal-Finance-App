import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { users, budgets, pots, transactions } from '../lib/placeholder-data';

import { getSql } from '../lib/db';

export const runtime = 'nodejs';

const sql = getSql();

async function seedUsers() {
  await sql`
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedBudgets() {
  await sql`
    CREATE TABLE IF NOT EXISTS budgets (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      category VARCHAR(255) NOT NULL,
      maximum_spend INT NOT NULL,
      theme VARCHAR(50) NOT NULL,
      amount INT NOT NULL
    );
  `;

  const insertedBudgets = await Promise.all(
    budgets.map((budget) => sql`
      INSERT INTO budgets (id, category, maximum_spend, theme, amount)
      VALUES (${budget.id}, ${budget.category}, ${budget.maximum_spend}, ${budget.theme}, ${budget.amount})
      ON CONFLICT (id) DO NOTHING;
    `),
  );

  return insertedBudgets;
}

async function seedPots() {
  await sql`
    CREATE TABLE IF NOT EXISTS pots (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      target INT NOT NULL,
      theme VARCHAR(50) NOT NULL,
      total INT NOT NULL
    );
  `;

  const insertedPots = await Promise.all(
    pots.map((pot) => sql`
      INSERT INTO pots (id, name, target, theme, total)
      VALUES (${pot.id}, ${pot.name}, ${pot.target}, ${pot.theme}, ${pot.total})
      ON CONFLICT (id) DO NOTHING;
    `),
  );

  return insertedPots;
}

export async function GET() {
  try {
    // ONLY drop the tables you want to reset. 
    // If you want to keep transactions as they are, remove it from this list.
    await sql`DROP TABLE IF EXISTS budgets CASCADE`;
    await sql`DROP TABLE IF EXISTS pots CASCADE`;

    // Seed the essentials
    await seedUsers(); // ON CONFLICT (id) DO NOTHING ensures you don't duplicate users
    console.log('Users checked/seeded');
    
    await seedBudgets();
    console.log('Budgets seeded');
    
    await seedPots();
    console.log('Pots seeded');

    // Commented out or deleted if not needed:
    // await seedTransactions(); 

    return Response.json({ message: 'Essential tables seeded successfully' });
  } catch (error: any) {
    console.error('Seeding Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}