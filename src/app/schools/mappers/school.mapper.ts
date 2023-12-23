import { School, SchoolDto } from '../models/school';

export class SchoolMapper {
  public static toDto(src: School): SchoolDto {
    return {
      name: src.name,
      is_active: src.isActive,
    };
  }
}
