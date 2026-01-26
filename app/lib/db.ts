import postgres from 'postgres';

export const runtime = 'nodejs';

let sql: ReturnType<typeof postgres> | null = null;

export function getSql() {
  if (!sql) {
    if (!process.env.POSTGRES_URL_NON_POOLING) {
      throw new Error('POSTGRES_URL_NON_POOLING is missing');
    }

    sql = postgres(process.env.POSTGRES_URL_NON_POOLING, {
      ssl: 'require',
    });
  }

  return sql;
}
