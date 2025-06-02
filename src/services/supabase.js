import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://dknyxxzpptqbmnefcxkl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrbnl4eHpwcHRxYm1uZWZjeGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NzMwMTgsImV4cCI6MjA2NDQ0OTAxOH0.vZ0hx4oAyFloQW6YfCaxDTL-wAV_-RqvAruX3SLVC-4';
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
