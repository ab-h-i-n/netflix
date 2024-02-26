import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://rdflgkoeugtqoxnqhliv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZmxna29ldWd0cW94bnFobGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5Njg2MzUsImV4cCI6MjAyNDU0NDYzNX0.H4GG1YKNHWfW7uioRRDGL01rA-HnpCQt6BM0tJA_TR0'
export const supabase = createClient(supabaseUrl, supabaseKey)