import {
  Quotation,
  QuotationDto,
  QuoteMutation,
  QuoteWithRefTables,
} from '../models/quotation';

export class QuotationMapper {
  public static toEntity(dto: QuoteWithRefTables): Quotation {
    return {
      id: dto.id,
      customerName: dto.customer_name,
      studentName: dto.student_name,
      date: dto.date,
      schoolGrade: dto.grade_id,
      gradeName: dto.school_grades.name,
      schoolName: dto.schools.name,
      totalAmmount: dto.total_ammount,
    };
  }

  public static toDto(src: QuoteMutation): QuotationDto {
    return {
      customer_name: src.customerName,
      student_name: src.studentName,
      date: src.date,
      grade_id: src.gradeId,
      school_id: src.schoolId,
      total_ammount: src.totalAmmount,
      promotion_type: src.promotionType,
    };
  }
}
