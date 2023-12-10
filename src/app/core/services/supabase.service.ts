import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private readonly supabaseUrl: string = environment.supabaseUrl;
  private readonly anonKey: string = environment.publicKey;
  public readonly supabase = createClient(this.supabaseUrl, this.anonKey);

  constructor() {}
}
