import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xnneefcmwkivfpzoftvs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhubmVlZmNtd2tpdmZwem9mdHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTIwMjUsImV4cCI6MjA2NTM2ODAyNX0.ja-qK4VlFR4sKC5ThUSwRWm-5OqufAMkq3D50UqBO8M'
export const supabase = createClient(supabaseUrl, supabaseKey)
