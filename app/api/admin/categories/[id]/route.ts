import { NextRequest, NextResponse } from 'next/server'
import { getCategories, updateCategory, deleteCategory } from '@/lib/data'
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
  const categories = await getCategories()
  const index = categories.findIndex(cat => cat.id === params.id)

  if (index === -1) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 })
  }

  const updated = {
    ...categories[index],
    name: data.name,
    slug: data.slug,
    order: data.order || 0,
  }

  await updateCategory(updated)
  return NextResponse.json({ success: true, category: updated })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await deleteCategory(params.id)
  return NextResponse.json({ success: true })
}
