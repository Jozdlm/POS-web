import { Injectable } from '@angular/core';
import { supaClient } from '@api/constants';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public readonly supabase = supaClient;

  constructor() {}
}
