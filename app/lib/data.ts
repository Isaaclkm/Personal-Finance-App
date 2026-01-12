import postgres from 'postgres';
import {
   users, budgets, pots, transactions 
} from './definitions';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Fetch all budgets
export async function fetchBudgets() {
  try {
    const data = await sql<budgets[]>`
      SELECT id, category, maximum_spend, theme, amount 
      FROM budgets 
      ORDER BY category ASC`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch budget data.');
  }
}

// Fetch all savings pots
export async function fetchPots() {
  try {
    const data = await sql<pots[]>`
      SELECT id, name, target, theme, total 
      FROM pots 
      ORDER BY name ASC`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pots data.');
  }
}

// Fetch the 5 most recent transactions for the dashboard
export async function fetchLatestTransactions() {
  try {
    const data = await sql<transactions[]>`
      SELECT id, amount, date, category, recipient, is_income
      FROM transactions
      ORDER BY date DESC
      LIMIT 5`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest transactions.');
  }
}

// Fetch overview data for dashboard cards
export async function fetchCardData() {
  try {
    // We can run these in parallel for better performance
    const totalBalancePromise = sql`SELECT SUM(amount) FROM transactions`;
    const totalSavedPromise = sql`SELECT SUM(total) FROM pots`;
    const activeBudgetsPromise = sql`SELECT COUNT(*) FROM budgets`;

    const data = await Promise.all([
      totalBalancePromise,
      totalSavedPromise,
      activeBudgetsPromise,
    ]);

    const totalBalance = formatCurrency(Number(data[0][0].sum ?? '0'));
    const totalSaved = formatCurrency(Number(data[1][0].sum ?? '0'));
    const numberOfBudgets = Number(data[2][0].count ?? '0');

    return {
      totalBalance,
      totalSaved,
      numberOfBudgets,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredTransactions(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const transactions = await sql<transactions[]>`
      SELECT
        id,
        amount,
        date,
        category,
        recipient,
        is_income
      FROM transactions
      WHERE
        recipient ILIKE ${`%${query}%`} OR
        category ILIKE ${`%${query}%`} OR
        amount::text ILIKE ${`%${query}%`}
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return transactions;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transactions.');
  }
}

export async function fetchTransactionsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM transactions
    WHERE
      recipient ILIKE ${`%${query}%`} OR
      category ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of transactions.');
  }
}