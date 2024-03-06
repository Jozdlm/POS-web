import { Category, CategoryDto } from './category';

export class CategoryMapper {
  public static toEntity(dto: CategoryDto): Category {
    if (!dto.id) {
      throw new Error('The Id should be provided to map from Dto to Entity');
    }

    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      slug: dto.slug,
      isActive: dto.is_active,
    };
  }

  public static toDto(src: Category): CategoryDto {
    return {
      name: src.name,
      description: src.description,
      slug: src.slug,
      is_active: src.isActive,
    };
  }
}
