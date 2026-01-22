import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { getCategories, insertCategory, type Category } from '@/lib/data'
import { isAdminAuthenticated } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await request.json()
  const categories = await getCategories()

  // 生成新 ID
  const newId = `category-${Date.now()}`
  const newCategory: Category = {
    id: newId,
    name: data.name,
    slug: data.slug,
    topCategoryId: data.topCategoryId,
    order: data.order || 0,
  }

  await insertCategory(newCategory)
  revalidatePath('/')

  return NextResponse.json({ success: true, category: newCategory })
}
