const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

// placeholder-data.ts

const budgets = [
  {
    id: '627b7890-8488-444a-9c2b-6893e25b184b',
    category: 'Entertainment',
    maximum_spend: 5000, 
    theme: '#277C78',
    amount: 1500,
  },
  {
    id: 'f888360d-886d-47c3-94c3-2b28c8959663',
    category: 'Bills',
    maximum_spend: 75000,
    theme: '#82C9D7',
    amount: 75000,
  },
  {
    id: '43d9c79e-4770-449e-8c33-66236b281f6d',
    category: 'Dining Out',
    maximum_spend: 30000,
    theme: '#F2CDAC',
    amount: 21250,
  },
];

const pots = [
  {
    id: 'd9620704-5f5a-4e89-980b-8d6c70f07421',
    name: 'Savings',
    target: 200000, 
    theme: '#277C78',
    total: 159000,
  },
  {
    id: '01d4d80a-9d9e-4712-9861-f3f508736d76',
    name: 'New Laptop',
    target: 100000,
    theme: '#626070',
    total: 10000,
  },
];

const transactions = [
  {
    id: '2561937a-4061-45a8-8b94-884639943f05',
    amount: 4599,
    date: '2024-01-12',
    category: 'Entertainment',
    recipient: 'Netflix',
    is_income: false,
  },
  {
    id: '86a67448-403d-4581-987d-419b67162d08',
    amount: 250000,
    date: '2024-01-10',
    category: 'Salary',
    recipient: 'Tech Corp',
    is_income: true,
  },
  {
    id: '4399e712-19e0-47b2-a38f-a9b09a962a98',
    amount: 1250,
    date: '2024-01-08',
    category: 'Dining Out',
    recipient: 'Starbucks',
    is_income: false,
  },
  {
    id: '1591c260-259e-44d5-9125-96144e68e469',
    amount: 8000,
    date: '2024-01-05',
    category: 'Bills',
    recipient: 'Verizon',
    is_income: false,
  },
];

export { users, budgets, pots, transactions };