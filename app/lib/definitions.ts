
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Budget = {
  id: string;
  category: string; // The category this budget applies to (e.g., 'Entertainment')
  maximum_spend: number;
  theme: string; // Hex code or color name (e.g., '#277C78')
  // Note: amount is often calculated dynamically, 
  // but included here as current spend per your requirement.
  amount: number; 
};

export type Pot = {
  id: string;
  name: string;
  target: number;
  theme: string;
  total: number; // Current balance in the pot
};

export type Transaction = {
  id: string;
  amount: number;
  date: string; 
  category: string;
  name: string; // The person or company paid/received from
  is_income: boolean; // Useful for styling (green vs black)
};

// Optional: Helper type for UI tables where you might need 
// to display the theme color alongside the transaction
export type TransactionWithTheme = Transaction & {
  theme?: string;
};

export interface Bills {
  id: string;
  name: string;
  image: string;
  date: string;
  amount: number;
  isPaid: boolean;
}

export interface BillsTableProps {
  bills: Bills[];
  itemsPerPage?: number;
  title?: string;
  showPagination?: boolean;
}

type Revenue = {
  month: string;
  revenue: number;
};

export default Revenue;
