import { getLinks, getCategories, getTopCategories } from '@/lib/data'
import HomeClient from './home-client'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'ToolsNavi - 链接资源聚合站',
  description: 'ToolsNavi 是一个优雅的链接管理与分享平台，集中展示各类推荐链接与工具',
  openGraph: {
    title: 'ToolsNavi - 链接资源聚合站',
    description: 'ToolsNavi 是一个优雅的链接管理与分享平台，集中展示各类推荐链接与工具',
    type: 'website',
  },
}

export default async function HomePage() {
  const [allLinks, categories, topCategories] = await Promise.all([
    getLinks(),
    getCategories(),
    getTopCategories(),
  ])

  return (
    <HomeClient
      initialLinks={allLinks}
      categories={categories}
      topCategories={topCategories}
    />
  )
}
