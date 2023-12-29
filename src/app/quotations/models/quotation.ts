import { QuotePromotionType } from './promotion-type.enum';
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
}

export interface QuoteMutation {
  customerName: string;
  studentName: string;
  date: string;
  gradeId: number;
  schoolId: number;
  promotionType: QuotePromotionType;
  totalAmmount: number;
}

export interface QuotationDto {
  customer_name: string;
  student_name: string;
  date: string;
  grade_id: number;
  school_id: number;
  total_ammount: number;
  promotion_type: QuotePromotionType;
}

export interface QuoteWithRefTables extends QuotationDto {
  id: number;
  school_grades: {
    name: string;
  };
  schools: {
    name: string;
  };
  promotion_type: QuotePromotionType;
}
