import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

export const SUPABASE_CLIENT = createClient(
  environment.supabaseUrl,
  environment.publicKey,
);
