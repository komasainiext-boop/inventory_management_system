import type {
  DashboardCard,
  InventoryOverviewItem,
  StockSummary,
} from "../types/dashboard";

export const dashboardCards: DashboardCard[] = [
  {
    id: "total-products",
    title: "Total Products",
    value: 248,
    description: "Products currently in inventory",
  },
  {
    id: "low-stock",
    title: "Low Stock",
    value: 18,
    description: "Products need restocking",
  },
  {
    id: "orders",
    title: "Orders",
    value: 76,
    description: "Orders processed this month",
  },
  {
    id: "users",
    title: "Users",
    value: 32,
    description: "Registered system users",
  },
];

export const inventoryOverview: InventoryOverviewItem[] = [
  {
    id: "available",
    label: "Available",
    value: 180,
  },
  {
    id: "reserved",
    label: "Reserved",
    value: 38,
  },
  {
    id: "low-stock",
    label: "Low Stock",
    value: 18,
  },
  {
    id: "out-of-stock",
    label: "Out of Stock",
    value: 12,
  },
];

export const stockSummary: StockSummary = {
  totalProducts: 248,
  lowStock: 18,
  healthyStock: 230,
};