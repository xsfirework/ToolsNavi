import { NextResponse } from 'next/server'
import { getCategories } from '@/lib/data'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const categories = await getCategories()
  return NextResponse.json(categories)
}
