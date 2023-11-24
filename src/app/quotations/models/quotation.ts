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

export interface QuotationDto {
  id?: number;
  customer_name: string;
  student_name: string;
  date: string;
  school_grade: number;
  school_name: string;
  total_ammount: number;
  items: QuotationItem[];
  created_at?: string;
}
