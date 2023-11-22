import { Injectable, inject } from '@angular/core';
import { SupabaseService } from 'src/app/core/services/supabase.service';
import { SchoolGrade } from '../models/school-grades';

@Injectable({
  providedIn: 'root',
})
export class SchoolGradeService {
  private readonly _supabaseService = inject(SupabaseService);
  private readonly _supabase = this._supabaseService.supabase;

  constructor() {}

  public async getSchoolGrades(): Promise<SchoolGrade[]> {
    let { data: school_grades, error } = await this._supabase
      .from('school_grades')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    return school_grades || [];
  }
}
