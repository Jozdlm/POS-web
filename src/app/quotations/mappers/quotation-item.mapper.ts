import { QuotationItem, QuotationItemDto } from '../models/quotation-item';

export class QuotationItemMapper {
  public static toEntity(dto: QuotationItemDto): QuotationItem {
    return {
      productId: dto.product_id,
      description: dto.products?.name || '',
      quantity: dto.quantity,
      price: dto.price,
      ammount: dto.quantity * dto.price,
    };
  }
}
