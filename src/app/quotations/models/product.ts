export interface Product {
  id: number;
  barcode: string;
  name: string;
  sellingPrice: number;
  isActive: boolean;
  inStock: boolean;
}

export interface ProductDto {
  id?: number;
  barcode: string;
  name: string;
  selling_price: number;
  is_active: boolean;
  in_stock: boolean;
  category_id: number;
}
