import { Quotation, QuotationDto } from '../models/quotation';

export class QuotationMapper {
  public static toEntity(dto: QuotationDto): Quotation {
    return {
      id: dto.id || 0,
      customerName: dto.customer_name,
      studentName: dto.student_name,
      date: dto.date,
      schoolGrade: dto.school_grade,
      gradeName: dto.school_grades?.name || '',
      schoolName: dto.school_name,
      totalAmmount: dto.total_ammount,
    };
  }

  public static toDto(src: Quotation): QuotationDto {
    return {
      customer_name: src.customerName,
      student_name: src.studentName,
      date: src.date,
      school_grade: src.schoolGrade,
      school_name: src.schoolName,
      total_ammount: src.totalAmmount,
    };
  }
}
