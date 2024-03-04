import { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from './constants';
import { from } from 'rxjs';

type LogInCredentials = SignInWithPasswordCredentials;

export function logInWithEmail(credentials: LogInCredentials) {
  return from(SUPABASE_CLIENT.auth.signInWithPassword(credentials));
}
