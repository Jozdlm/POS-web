import { Injectable } from '@angular/core';
import { SUPABASE_CLIENT } from '@api/constants';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public readonly supabase = SUPABASE_CLIENT;

  constructor() {}
}
