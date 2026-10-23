import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ygutvqmsthquxuyppbtt.supabase.co';
const supabaseKey = 'sb_publishable_6RwiwV-DRxelLdJ6sZoDAw_B_eOnsPi';

export const supabase = createClient(supabaseUrl, supabaseKey);