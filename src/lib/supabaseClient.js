import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim()
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()

function getSupabaseHost(url) {
  try {
    return new URL(url).host
  } catch {
    return ''
  }
}

const supabaseHost = getSupabaseHost(supabaseUrl)

export const supabaseConfig = {
  hasUrl: Boolean(supabaseUrl),
  hasAnonKey: Boolean(supabaseAnonKey),
  host: supabaseHost,
  urlIsValid: Boolean(supabaseHost),
}

export const isSupabaseConfigured =
  supabaseConfig.hasUrl && supabaseConfig.hasAnonKey && supabaseConfig.urlIsValid

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null
