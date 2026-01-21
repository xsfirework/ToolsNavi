import { notFound } from 'next/navigation'
import { getCategories, getCategoryBySlug, getLinksByCategory } from '@/lib/data'
import type { Metadata } from 'next'
import CategoryClient from './category-client'

export async function generateStaticParams() {
  const categories = getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug)
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

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug)
  if (!category) {
    notFound()
  }

  const categories = getCategories()
  const links = getLinksByCategory(category.id)

  return (
    <CategoryClient
      category={category}
      categories={categories}
      links={links}
    />
  )
}
