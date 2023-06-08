export interface Product {
  id: number;
  barcode: string;
  product_name: string;
  min_stock: number;
  selling_price: number;
  img_url: string;
  category: Category;
  is_active: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface ProductDto {
  barcode: string;
  product_name: string;
  min_stock: number;
  selling_price: number;
  img_url: string;
  category_id: number;
  is_active: boolean;
}
