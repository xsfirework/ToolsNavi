import { notFound } from 'next/navigation'
import { getCategories, getCategoryBySlug, getLinksByCategory } from '@/lib/data'
import type { Metadata } from 'next'
import CategoryClient from './category-client'

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug)
  if (!category) {
    return {
      title: '分类不存在',
    }
  }
  return {
    title: `${category.name} - ToolsNavi`,
    description: `浏览 ${category.name} 分类下的所有链接资源`,
    openGraph: {
      title: `${category.name} - ToolsNavi`,
      description: `浏览 ${category.name} 分类下的所有链接资源`,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug)
  if (!category) {
    notFound()
  }

  const [categories, links] = await Promise.all([
    getCategories(),
    getLinksByCategory(category.id),
  ])

  return (
    <CategoryClient
      category={category}
      categories={categories}
      links={links}
    />
  )
}
