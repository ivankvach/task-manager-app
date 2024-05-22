declare module '@supabase/supabase-js' {
  import { SupabaseClient } from '@supabase/supabase-js/dist/main/index';

  export function createClient(
    supabaseUrl: string,
    supabaseKey: string
  ): SupabaseClient;
}
