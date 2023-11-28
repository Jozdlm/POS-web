export interface QuotationItem {
  id?: number;
  productId: number;
  description: string;
  quantity: number;
  price: number;
  ammount: number;
}

export interface QuotationItemDto {
  id?: number;
  product_id: number;
  quantity: number;
  price: number;
  quotation_id: number;
  products?: {
    name: string;
  };
}
