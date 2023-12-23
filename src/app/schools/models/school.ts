export interface School {
  id: number;
  name: string;
  isActive: boolean;
}

export type CreateSchool = Omit<School, 'id'>;
export type UpdateSchool = Omit<School, 'id'>;
export type SchoolMutation = CreateSchool | UpdateSchool;

export interface SchoolDto {
  id?: number;
  name: string;
  is_active: boolean;
}
