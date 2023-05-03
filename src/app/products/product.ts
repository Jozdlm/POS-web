export interface Product {
  id: number;
  barcode: string;
  product_name: string;
  min_stock: number;
  selling_price: number;
  img_url: string;
  category: string;
  active: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}