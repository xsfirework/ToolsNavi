'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Link as LinkType, Category } from '@/lib/data'
import LinkCardSmall from '@/components/LinkCardSmall'
import LinkDetailModal from '@/components/LinkDetailModal'

interface CategoryClientProps {
  category: Category
  categories: Category[]
  links: LinkType[]
}

export default function CategoryClient({ category, categories, links }: CategoryClientProps) {
  const [selectedLink, setSelectedLink] = useState<LinkType | null>(null)

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
            ToolsNavi
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧分类栏 */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">分类</h2>
              <nav className="space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className={`block px-4 py-2 rounded-lg transition-colors ${cat.id === category.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* 右侧链接列表 - 使用紧凑卡片布局 */}
          <main className="flex-1">
            {/* 分类标题 - 左侧有绿色竖线 */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-green-500 rounded-full"></div>
              <h1 className="text-2xl font-semibold text-gray-900">{category.name}</h1>
            </div>

            {links.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">该分类下暂无链接</p>
              </div>
            ) : (
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gridAutoRows: 'min-content',
                }}
              >
                {links.map((link) => (
                  <LinkCardSmall
                    key={link.id}
                    link={link}
                    onClick={() => setSelectedLink(link)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 详情模态框 */}
      <LinkDetailModal
        link={selectedLink}
        onClose={() => setSelectedLink(null)}
      />
    </div>
  )
}
