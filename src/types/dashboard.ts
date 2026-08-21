export interface DashboardCard {
  id: string;
  title: string;
  value: number;
  description: string;
}

export interface InventoryOverviewItem {
  id: string;
  label: string;
  value: number;
}

export interface StockSummary {
  totalProducts: number;
  lowStock: number;
  healthyStock: number;
}