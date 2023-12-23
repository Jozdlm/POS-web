export interface School {
  id: number;
  name: string;
  isActive: boolean;
}

// TODO: Make the id property optional for both interfaces
export interface SchoolDto {
  id?: number;
  name: string;
  is_active: boolean;
}
