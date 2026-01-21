import { NextRequest, NextResponse } from 'next/server'
import { getLinks, updateLink, deleteLink, type Link } from '@/lib/data'
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
  const links = await getLinks()
  const index = links.findIndex(link => link.id === params.id)

  if (index === -1) {
    return NextResponse.json({ error: 'Link not found' }, { status: 404 })
  }

  const updated: Link = {
    ...links[index],
    title: data.title,
    slug: data.slug,
    description: data.description || '',
    url: data.url,
    categoryId: data.categoryId,
    icon: data.icon || '',
    order: data.order || 0,
  }

  await updateLink(updated)
  return NextResponse.json({ success: true, link: updated })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await deleteLink(params.id)
  return NextResponse.json({ success: true })
}
