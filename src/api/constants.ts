import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

export const supaClient = createClient(
  environment.supabaseUrl,
  environment.publicKey,
);
