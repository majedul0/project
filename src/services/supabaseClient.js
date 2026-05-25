/**
 * Supabase Client Initialization
 * ==============================
 * This file initializes and exports the Supabase client for the entire application.
 * It uses environment variables from .env file for secure configuration.
 * 
 * Usage:
 *   import supabase from '@/services/supabaseClient'
 *   const { data, error } = await supabase.from('table_name').select()
 */

import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Validate that environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  throw new Error('Supabase URL and key are required')
}

// Create and export the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
