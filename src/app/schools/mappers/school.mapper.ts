import { CreateSchool, SchoolDto } from '../models/school';

export class SchoolMapper {
  public static toDto(src: CreateSchool): SchoolDto {
    return {
      name: src.name,
      is_active: src.isActive,
    };
  }
}
