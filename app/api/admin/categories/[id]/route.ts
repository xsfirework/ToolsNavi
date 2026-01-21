import { NextRequest, NextResponse } from 'next/server'
import { getCategories, saveCategories } from '@/lib/data'
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
  const categories = getCategories()
  const index = categories.findIndex(cat => cat.id === params.id)

  if (index === -1) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 })
  }

  categories[index] = {
    ...categories[index],
    name: data.name,
    slug: data.slug,
    order: data.order || 0,
  }

  saveCategories(categories)
  return NextResponse.json({ success: true, category: categories[index] })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const categories = getCategories()
  const filteredCategories = categories.filter(cat => cat.id !== params.id)

  if (filteredCategories.length === categories.length) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 })
  }

  saveCategories(filteredCategories)
  return NextResponse.json({ success: true })
}
