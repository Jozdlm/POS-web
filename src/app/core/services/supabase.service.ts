import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl: string = 'https://grvggsbcrwpzcjvrfvhf.supabase.co';
  private anonKey: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdydmdnc2JjcndwemNqdnJmdmhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4NTU0NTksImV4cCI6MjAwNjQzMTQ1OX0.KXtUaNjr2CIxW7iMmOh-cA4Ys05Y9zgiTkOCBoApiwM';
  public readonly supabase = createClient(this.supabaseUrl, this.anonKey);

  constructor() {}
}
