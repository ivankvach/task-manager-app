import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dexjvunkseuyoytutsmg.supabase.co'; // Replace with your Supabase URL
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRleGp2dW5rc2V1eW95dHV0c21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzNzYxNDksImV4cCI6MjAzMTk1MjE0OX0.vJ9y3PBZORziIDVdmt7Jg66Inuv9V0E2FlcmjQaOPFE'; // Replace with your Supabase API key

export const supabase = createClient(supabaseUrl, supabaseKey);
