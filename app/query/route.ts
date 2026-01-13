import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listBudgets() {
	const data = await sql`
    SELECT id, category, maximum_spend, theme, amount 
    FROM budgets 
    WHERE budgets.id = '627b7890-8488-444a-9c2b-6893e25b184b';
  `;

	return data;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
  	return Response.json(await listBudgets());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
