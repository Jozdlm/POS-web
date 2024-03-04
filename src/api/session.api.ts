import { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from './constants';
import { Observable, from, map } from 'rxjs';

type LogInCredentials = SignInWithPasswordCredentials;

export function logInWithEmail(credentials: LogInCredentials) {
  return from(SUPABASE_CLIENT.auth.signInWithPassword(credentials));
}

export function logOut() {
  return from(SUPABASE_CLIENT.auth.signOut());
}

export function getSessionToken(): Observable<string | null> {
  return from(SUPABASE_CLIENT.auth.getSession()).pipe(
    map(({ data, error }) => {
      if (error) throw new Error(error.message);

      if (!data.session) {
        return null;
      }

      return data.session.access_token;
    }),
  );
}
