'use server';

import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// --- EXISTING INVOICE SCHEMA ---
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({ invalid_type_error: 'Please select a customer.' }),
  amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], { invalid_type_error: 'Please select an invoice status.' }),
  date: z.string(),
});

// --- NEW POT SCHEMA ---
const PotSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Please enter a name for your pot.' }),
  target: z.coerce.number().gt(0, { message: 'Please enter a target greater than $0.' }),
  theme: z.string({ invalid_type_error: 'Please select a theme.' }),
  total: z.number(),
});

const CreatePot = PotSchema.omit({ id: true, total: true });

// State type for Form handling
export type State = {
  errors?: {
    name?: string[];
    target?: string[];
    theme?: string[];
  };
  message?: string | null;
};

// --- NEW CREATE POT ACTION ---
export async function createPot(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreatePot.safeParse({
    name: formData.get('name'),
    target: formData.get('target'),
    theme: formData.get('theme'),
  });

  // If validation fails, return errors early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Pot.',
    };
  }

  const { name, target, theme } = validatedFields.data;
  const initialTotal = 0; // New pots start at $0

  try {
    await sql`
      INSERT INTO pots (name, target, theme, total)
      VALUES (${name}, ${target}, ${theme}, ${initialTotal})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Pot.',
    };
  }

  revalidatePath('/dashboard/pots'); // Adjust this path to wherever your pots are displayed
  redirect('/dashboard/pots');
}

// ... rest of your existing functions (createInvoice, authenticate, etc.)