import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tzqjnkpqcwdsubgdxilr.supabase.co' //Aca se pone su URL y en el de abajo su API Key
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6cWpua3BxY3dkc3ViZ2R4aWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MDE1NTQsImV4cCI6MjA5NDM3NzU1NH0.crAPtLDxFgPFmR-znDbTPy7XWYTYzPxvNzOhaqGiOnc'

export const supabase = createClient(supabaseUrl, supabaseKey)