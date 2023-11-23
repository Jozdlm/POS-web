// Supabase products
export interface Product {
  id: number;
  barcode: string;
  name: string;
  sellingPrice: number;
  isActive: boolean;
  inStock: boolean;
}
