import type { DashboardCard } from '../types/dashboard';

export const dashboardCards: DashboardCard[] = [
  {
    id: 'total-products',
    title: 'Total Products',
    value: 248,
    description: 'Products currently in inventory',
  },
  {
    id: 'low-stock',
    title: 'Low Stock',
    value: 18,
    description: 'Products need restocking',
  },
  {
    id: 'orders',
    title: 'Orders',
    value: 76,
    description: 'Orders processed this month',
  },
  {
    id: 'users',
    title: 'Users',
    value: 32,
    description: 'Registered system users',
  },
];