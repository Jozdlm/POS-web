import { QuotationItem, QuotationItemDto } from './quotation-item';
import {
  Quotation,
  QuotationDto,
  QuoteMutation,
  QuoteWithRefTables,
} from './quotation';

export class QuoteMapper {
  public static toEntity(dto: QuoteWithRefTables): Quotation {
    return {
      id: dto.id,
      customerName: dto.customer_name,
      studentName: dto.student_name,
      date: dto.date,
      schoolGrade: dto.grade_id,
      gradeName: dto.school_grades.name,
      promotionDescription: dto.promotion_type.description,
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
      promotion_id: src.promotionId,
    };
  }
}

export class QuoteItemMapper {
  public static toEntity(dto: QuotationItemDto): QuotationItem {
    return {
      productId: dto.product_id,
      description: dto.products?.name || '',
      quantity: dto.quantity,
      price: dto.price,
      discount: dto.discount,
      ammount: dto.quantity * dto.price - dto.discount,
    };
  }

  public static toDto(
    src: QuotationItem,
    quotationId: number,
  ): QuotationItemDto {
    return {
      product_id: src.productId,
      quantity: src.quantity,
      price: src.price,
      discount: src.discount,
      quotation_id: quotationId,
    };
  }
}
