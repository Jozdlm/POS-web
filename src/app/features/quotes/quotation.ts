export interface Quotation {
  id?: number;
  customerName: string;
  studentName: string;
  date: string;
  schoolGrade: number;
  gradeName: string;
  promotionDescription: string;
  schoolName: string;
  totalAmmount: number;
}

export interface QuoteMutation {
  customerName: string;
  studentName: string;
  date: string;
  gradeId: number;
  schoolId: number;
  promotionId: number;
  totalAmmount: number;
}

export interface QuotationDto {
  id?: number;
  customer_name: string;
  student_name: string;
  date: string;
  grade_id: number;
  school_id: number;
  total_ammount: number;
  promotion_id: number;
}

export interface QuoteWithRefTables extends QuotationDto {
  id: number;
  school_grades: {
    name: string;
  };
  schools: {
    name: string;
  };
  promotion_type: {
    description: string;
  };
}
