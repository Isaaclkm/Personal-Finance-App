'use server';

import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
 
// ...
import { getSql } from '@/app/lib/db';

const sql = getSql();


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// 1. Add this to your SCHEMAS section
const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// 2. Updated signUp function using your 'sql' constant
export async function signUp(prevState: string | undefined, formData: FormData) {
  const validatedFields = UserSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return 'Invalid fields. Please check your inputs.';
  }

  const { name, email, password } = validatedFields.data;

  try {
    // Check if user already exists using your 'sql' tag
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return 'An account with this email already exists.';
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user

    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;

  } catch (error) {
    console.error('Database error:', error);
    return 'Failed to create account. Please try again.';
  }

  // Redirect is outside the try/catch
  redirect('/login');
}

// --- SCHEMAS ---

const PotSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Please enter a name for your pot.' }),
  target: z.coerce.number().gt(0, { message: 'Please enter a target greater than $0.' }),
  theme: z.string({ invalid_type_error: 'Please select a theme.' }),
  total: z.number(),
});

const BudgetSchema = z.object({
  id: z.string(),
  category: z.string().min(1, { message: 'Please select a category.' }), 
  maximum_spend: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  theme: z.string({ invalid_type_error: 'Please select a theme.' }),
  amount: z.number(),
});

// Validation for Creating (omitting internal DB fields)
const CreatePot = PotSchema.omit({ id: true, total: true });
const CreateBudget = BudgetSchema.omit({ id: true, amount: true });
const AddMoneySchema = z.object({
  amount: z.coerce.number().gt(0, { message: 'Amount must be greater than $0.' }),
});

// Flexible State type to handle different forms
// Base type for shared properties
export type BaseState = {
  message?: string | null;
};

export type PotState = BaseState & {
  errors?: {
    name?: string[];
    target?: string[];
    theme?: string[];
  };
};

export type BudgetState = BaseState & {
  errors?: {
    category?: string[];
    maximum_spend?: string[];
    theme?: string[];
  };
};

export type TransactionState = BaseState & {
  errors?: {
    recipient?: string[];
    category?: string[];
    amount?: string[];
    is_income?: string[];
  };
};

export type WithdrawMoneyState = {
  errors?: {
    amount?: string[];
  };
  message?: string | null;
};



// --- ACTIONS ---

export async function createPot(prevState: PotState, formData: FormData) {
  const validatedFields = CreatePot.safeParse({
    name: formData.get('name'),
    target: formData.get('target'),
    theme: formData.get('theme'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Pot.',
    };
  }

  const { name, target, theme } = validatedFields.data;
  const initialTotal = 0;

  try {
    await sql`
      INSERT INTO pots (name, target, theme, total)
      VALUES (${name}, ${target}, ${theme}, ${initialTotal})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Create Pot.' };
  }

  revalidatePath('/dashboard/pots');
  redirect('/dashboard/pots');
}
export type AddMoneyState = {
  errors?: {
    amount?: string[];
  };
  message?: string | null;
};


export async function addMoneyToPot(
  potId: string, 
  target: number, // Add target as a parameter
  prevState: AddMoneyState, 
  formData: FormData
): Promise<AddMoneyState> {
  
  const validatedFields = AddMoneySchema.safeParse({
    amount: formData.get('amount'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid amount.',
    };
  }

  const { amount } = validatedFields.data;

  try {
    // 1. Fetch current total to verify the math on the server
    const data = await sql`SELECT total FROM pots WHERE id = ${potId}`;
    const currentTotal = data[0].total;

    // 2. The Logic Check: Current + New vs Target
    if (currentTotal + amount > target) {
      return {
        errors: {
          amount: [`Adding $${amount} would exceed your target of $${target.toLocaleString()}.`],
        },
        message: 'Target exceeded.',
      };
    }

    // 3. If check passes, perform the update
    await sql`
      UPDATE pots 
      SET total = total + ${amount}
      WHERE id = ${potId}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to add money.' };
  }

  revalidatePath('/dashboard/pots');
  return { message: 'Success', errors: {} };
}


export async function withdrawMoneyFromPot(
  potId: string, 
  prevState: WithdrawMoneyState, 
  formData: FormData
): Promise<WithdrawMoneyState> {
  
  const validatedFields = AddMoneySchema.safeParse({
    amount: formData.get('amount'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid amount.',
    };
  }

  const { amount } = validatedFields.data;

  try {
    // 1. Fetch current total to verify the math on the server
    const data = await sql`SELECT total FROM pots WHERE id = ${potId}`;
    const currentTotal = data[0].total;

    // 2. The Logic Check: Cannot withdraw more than is available
    if (amount > currentTotal) {
      return {
        errors: {
          amount: [`You only have $${currentTotal.toLocaleString()} available.`],
        },
        message: 'Insufficient funds.',
      };
    }

    // 3. Perform the subtraction
    await sql`
      UPDATE pots 
      SET total = total - ${amount}
      WHERE id = ${potId}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to withdraw money.' };
  }

  revalidatePath('/dashboard/pots');
  return { message: 'Success', errors: {} };
}


export async function createBudget(prevState: BudgetState, formData: FormData) {
  const validatedFields = CreateBudget.safeParse({
    category: formData.get('category'),
    maximum_spend: formData.get('maximum_spend'),
    theme: formData.get('theme'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Budget.',
    };
  }

  const { category, maximum_spend, theme } = validatedFields.data;
  const initialAmount = 0;

  try {
    await sql`
      INSERT INTO budgets (category, maximum_spend, theme, amount)
      VALUES (${category}, ${maximum_spend}, ${theme}, ${initialAmount})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Create Budget.' };
  }

  revalidatePath('/dashboard/budgets');
  redirect('/dashboard/budgets');
}