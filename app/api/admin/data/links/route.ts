import { NextResponse } from 'next/server'
import { getLinks } from '@/lib/data'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const links = getLinks()
  return NextResponse.json(links)
}
