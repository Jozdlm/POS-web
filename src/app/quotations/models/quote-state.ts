import { QuotationItem } from "./quotation-item";

export interface QuoteState {
  items: QuotationItem[];
  subtotal: number;
  discount: number;
  total: number;
}
