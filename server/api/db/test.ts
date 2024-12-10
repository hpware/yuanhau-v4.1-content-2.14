import { createClient } from '@supabase/supabase-js'
const supabasetoken = process.env.SUPABASE_KEY
const supabase = createClient('https://rlretgpxqtgzsjuhqjwu.supabase.co', `${supabasetoken}`)

export default defineEventHandler(async (event) => {
    const { data } = await supabase.from('countries').select()
    return data
})