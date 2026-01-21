import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Helper to load env vars from .env.local manually to avoid adding 'dotenv' dependency
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local')
        if (!fs.existsSync(envPath)) {
            console.warn('Warning: .env.local file not found at', envPath)
            return
        }
        const envConfig = fs.readFileSync(envPath, 'utf8')
        envConfig.split('\n').forEach((line) => {
            const match = line.match(/^([^=]+)=(.*)$/)
            if (match) {
                const key = match[1].trim()
                const value = match[2].trim().replace(/^["'](.*)["']$/, '$1')
                process.env[key] = value
            }
        })
        console.log('Environment variables loaded from .env.local')
    } catch (err) {
        console.error('Error loading .env.local:', err)
    }
}

async function testSupabase() {
    console.log('Starting Supabase connection test...')
    loadEnv()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        console.error('Error: Missing Supabase environment variables.')
        console.error('Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local')
        process.exit(1)
    }

    console.log('Supabase URL:', supabaseUrl)
    // Mask key for security in logs
    console.log('Supabase Key:', supabaseKey ? 'Found ' + supabaseKey.substring(0, 5) + '...' : 'Missing')

    const supabase = createClient(supabaseUrl, supabaseKey)

    try {
        console.log('Attempting to fetch data from "links" table...')
        const { data, error } = await supabase
            .from('links')
            .select('*')
            .limit(5)

        if (error) {
            console.error('Supabase query error:', error)
            process.exit(1)
        }

        console.log('Successfully connected to Supabase!')
        console.log(`Retrieved ${data.length} records from "links" table.`)
        if (data.length > 0) {
            console.log('Sample data (first record):', data[0])
        } else {
            console.warn('Table "links" is empty.')
        }

    } catch (err) {
        console.error('Unexpected error during test:', err)
        process.exit(1)
    }
}

testSupabase()
