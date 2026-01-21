import { NextRequest, NextResponse } from 'next/server'
import { getLinks, saveLinks, type Link } from '@/lib/data'
import { isAdminAuthenticated } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()
  const links = getLinks()

  // 生成新 ID
  const newId = `link-${Date.now()}`
  const newLink: Link = {
    id: newId,
    title: data.title,
    slug: data.slug,
    description: data.description || '',
    url: data.url,
    categoryId: data.categoryId,
    icon: data.icon || '',
    order: data.order || 0,
  }

  links.push(newLink)
  saveLinks(links)

  return NextResponse.json({ success: true, link: newLink })
}
