import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

export const supabaseClient = createClient(
  environment.supabaseUrl,
  environment.publicKey,
);
