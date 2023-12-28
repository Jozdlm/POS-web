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

export interface QuoteMutation {
  customerName: string;
  studentName: string;
  date: string;
  schoolGradeId: number;
  schoolId: number;
  promotionTypeId: number;
  totalAmmount: number;
}

export interface QuotationDto {
  customer_name: string;
  student_name: string;
  date: string;
  grade_id: number;
  school_id: number;
  total_ammount: number;
  promotion_type: number;
}

export interface QuoteWithRefTables extends QuotationDto {
  id: number;
  school_grades: {
    name: string;
  };
  schools: {
    name: string;
  };
  quote_promotion: {
    description: string;
  };
  created_at: string;
}
