const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const budgets = [
  {
    id: 'b10544b2-4001-4271-9855-fec4b6a6442a',
    category: 'Entertainment',
    maximum_spend: 5000, // stored in cents (e.g., $50.00)
    theme: '#277C78',
    amount: 1500,
  },
  {
    id: 'b10544b2-4001-4271-9855-fec4b6a6442b',
    category: 'Bills',
    maximum_spend: 75000,
    theme: '#82C9D7',
    amount: 75000,
  },
  {
    id: 'b10544b2-4001-4271-9855-fec4b6a6442c',
    category: 'Dining Out',
    maximum_spend: 30000,
    theme: '#F2CDAC',
    amount: 21250,
  },
];

const pots = [
  {
    id: 'p10544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Savings',
    target: 200000, // $2,000.00
    theme: '#277C78',
    total: 159000,
  },
  {
    id: 'p10544b2-4001-4271-9855-fec4b6a6442b',
    name: 'New Laptop',
    target: 100000,
    theme: '#626070',
    total: 10000,
  },
];

const transactions = [
  {
    id: 't10544b2-4001-4271-9855-fec4b6a6442a',
    amount: 4599,
    date: '2024-01-12',
    category: 'Entertainment',
    recipient: 'Netflix',
    is_income: false,
  },
  {
    id: 't10544b2-4001-4271-9855-fec4b6a6442b',
    amount: 250000,
    date: '2024-01-10',
    category: 'Salary',
    recipient: 'Tech Corp',
    is_income: true,
  },
  {
    id: 't10544b2-4001-4271-9855-fec4b6a6442c',
    amount: 1250,
    date: '2024-01-08',
    category: 'Dining Out',
    recipient: 'Starbucks',
    is_income: false,
  },
  {
    id: 't10544b2-4001-4271-9855-fec4b6a6442d',
    amount: 8000,
    date: '2024-01-05',
    category: 'Bills',
    recipient: 'Verizon',
    is_income: false,
  },
];

export { users, budgets, pots, transactions };