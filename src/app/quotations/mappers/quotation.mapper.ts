import { Quotation, QuotationDto } from '../models/quotation';

export class QuotationMapper {
  public static toEntity(dto: QuotationDto): Quotation {
    return {
      id: dto.id || 0,
      customerName: dto.customer_name,
      studentName: dto.student_name,
      date: dto.date,
      schoolGrade: dto.grade_id,
      gradeName: dto.school_grades?.name || '',
      schoolName: dto.schools?.name || '',
      totalAmmount: dto.total_ammount,
    };
  }

  public static toDto(src: Quotation): QuotationDto {
    return {
      customer_name: src.customerName,
      student_name: src.studentName,
      date: src.date,
      grade_id: src.schoolGrade,
      school_id: src.schoolName,
      total_ammount: src.totalAmmount,
    };
  }
}
