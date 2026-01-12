import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listBudgets() {
	const data = await sql`
    SELECT id, category, maximum_spend, theme, amount 
    FROM budgets 
    WHERE budgets.id = 'b10544b2-4001-4271-9855-fec4b6a6442a';
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
