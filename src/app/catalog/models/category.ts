export interface Category {
  id?: number;
  name: string;
  description: string;
  slug: string;
  isActive: boolean;
}

export interface CategoryDto {
  id?: number;
  name: string;
  description: string;
  slug: string;
  is_active: boolean;
}
