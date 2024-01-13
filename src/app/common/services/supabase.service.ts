import { Injectable } from '@angular/core';
import { supabaseClient } from '@api/constants';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public readonly supabase = supabaseClient;

  constructor() {}
}
