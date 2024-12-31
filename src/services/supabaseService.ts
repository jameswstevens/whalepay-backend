import { supabase } from '../config/supabase';

export class SupabaseService {
  async getAllUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }

    return data;
  }

  async getUserByAddress(baseAddress: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('base_address', baseAddress)
      .limit(1);

    if (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }

    return data?.[0] || null;
  }
}

export const supabaseService = new SupabaseService(); 