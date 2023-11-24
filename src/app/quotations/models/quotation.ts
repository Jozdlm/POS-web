import { QuotationItem } from './quotation-item';

export interface Quotation {
  id?: number;
  customerName: string;
  studentName: string;
  date: string;
  schoolGrade: number;
  schoolName: string;
  totalAmmount: number;
  items: QuotationItem[];
  createdAt?: string;
}
