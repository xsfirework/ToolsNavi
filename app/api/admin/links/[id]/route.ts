import { NextRequest, NextResponse } from 'next/server'
import { getLinks, saveLinks, type Link } from '@/lib/data'
import { isAdminAuthenticated } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()
  const links = getLinks()
  const index = links.findIndex(link => link.id === params.id)

  if (index === -1) {
    return NextResponse.json({ error: 'Link not found' }, { status: 404 })
  }

  links[index] = {
    ...links[index],
    title: data.title,
    slug: data.slug,
    description: data.description || '',
    url: data.url,
    categoryId: data.categoryId,
    icon: data.icon || '',
    order: data.order || 0,
  }

  saveLinks(links)
  return NextResponse.json({ success: true, link: links[index] })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const links = getLinks()
  const filteredLinks = links.filter(link => link.id !== params.id)

  if (filteredLinks.length === links.length) {
    return NextResponse.json({ error: 'Link not found' }, { status: 404 })
  }

  saveLinks(filteredLinks)
  return NextResponse.json({ success: true })
}
