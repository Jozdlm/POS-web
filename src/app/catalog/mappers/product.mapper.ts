import { Product, ProductDto } from '@app/quotations/models/product';

export class ProductMapper {
  public static toEntity(dto: ProductDto): Product {
    if (!dto.id) {
      throw new Error('The id should provided to map from Dto to Entity');
    }

    return {
      id: dto.id,
      barcode: dto.barcode,
      name: dto.name,
      sellingPrice: dto.selling_price,
      inStock: dto.in_stock,
      isActive: dto.is_active,
    };
  }

  public static toDto() {}
}
