import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://itndwxihpoziamdiwbtu.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bmR3eGlocG96aWFtZGl3YnR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxNDU5MDIsImV4cCI6MTk5MzcyMTkwMn0.eTwXNKUcIvhdPZdN9uDrcnPSKWJKsGX3W4CxsC8SQRI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)