import { QuotationItem, QuotationItemDto } from '../models/quotation-item';

export class QuotationItemMapper {
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
