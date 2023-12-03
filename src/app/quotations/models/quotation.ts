import { QuotationItem } from './quotation-item';

export interface Quotation {
  id?: number;
  customerName: string;
  studentName: string;
  date: string;
  schoolGrade: number;
  gradeName?: string;
  schoolName: string;
  totalAmmount: number;
  items?: QuotationItem[];
  createdAt?: string;
}

export interface QuotationDto {
  id?: number;
  customer_name: string;
  student_name: string;
  date: string;
  grade_id: number;
  school_id: string;
  total_ammount: number;
  created_at?: string;
  school_grades?: {
    name: string;
  };
  schools?: {
    name: string;
  };
}
