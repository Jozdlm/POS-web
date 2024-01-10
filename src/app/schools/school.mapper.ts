import { School, SchoolDto, SchoolMutation } from './models/school';

export class SchoolMapper {
  public static toDto(src: SchoolMutation): SchoolDto {
    return {
      name: src.name,
      is_active: src.isActive,
    };
  }

  public static toEntity(dto: SchoolDto): School {
    if (!dto.id) {
      throw new Error('The Id should be provided to map from Dto to Entity');
    }

    return {
      id: dto.id,
      name: dto.name,
      isActive: dto.is_active,
    };
  }
}
