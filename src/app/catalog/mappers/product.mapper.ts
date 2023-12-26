import {
  Product,
  ProductDto,
  ProductMutation,
} from '@app/catalog/models/product';

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
      categoryId: dto.category_id,
    };
  }

  public static toDto(src: ProductMutation): ProductDto {
    return {
      name: src.name,
      barcode: src.barcode,
      selling_price: src.sellingPrice,
      in_stock: src.inStock,
      is_active: src.isActive,
      category_id: src.categoryId,
    };
  }
}
