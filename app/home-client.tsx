'use client'

import { useState, useMemo } from 'react'
import type { Link as LinkType, Category, TopCategory } from '@/lib/data'
import LinkCardSmall from '@/components/LinkCardSmall'
import LinkDetailModal from '@/components/LinkDetailModal'

interface HomeClientProps {
  initialLinks: LinkType[]
  categories: Category[]
  topCategories: TopCategory[]
}

export default function HomeClient({ initialLinks, categories, topCategories }: HomeClientProps) {
  // 默认显示第一个大类目
  const [activeTopCategoryId, setActiveTopCategoryId] = useState<string>(
    topCategories[0]?.id || ''
  )

  // 选中的链接（用于显示详情模态框）
  const [selectedLink, setSelectedLink] = useState<LinkType | null>(null)
  // 搜索关键词
  const [searchQuery, setSearchQuery] = useState('')

  // 获取当前大类目下的分类
  const currentCategories = useMemo(() => {
    return categories
      .filter(cat => cat.topCategoryId === activeTopCategoryId)
      .sort((a, b) => a.order - b.order)
  }, [categories, activeTopCategoryId])

  // 点击左侧分类时滚动到对应区域
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // 获取当前分类下的链接（如果有搜索，则搜索所有链接）
  const currentLinks = useMemo(() => {
    let filteredLinks = initialLinks

    // 如果有搜索关键词，搜索所有链接
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase()
      filteredLinks = initialLinks.filter(link =>
        link.title.toLowerCase().includes(lowerQuery) ||
        link.description.toLowerCase().includes(lowerQuery)
      )
    } else {
      // 显示当前大类目下的所有链接
      const currentCategoryIds = new Set(currentCategories.map(c => c.id))
      filteredLinks = initialLinks.filter(link => currentCategoryIds.has(link.categoryId))
    }

    return filteredLinks.sort((a, b) => a.order - b.order)
  }, [initialLinks, searchQuery, currentCategories])

  return (
    <div className="min-h-screen bg-[#fffafa]" style={{ overflowY: 'scroll' }}>
      {/* 顶部大类目切换 */}
      <header
        className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50 py-8"
        style={{ scrollbarGutter: 'stable' }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
          <h1 className="text-4xl font-black text-rose-500 tracking-tight italic">ToolsNavi</h1>

          <div className="w-full max-w-2xl flex items-center gap-3">
            <div className="relative flex-1 group">
              <input
                type="text"
                placeholder="搜索内容"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 bg-rose-50/50 border-2 border-rose-100 rounded-full focus:outline-none focus:border-rose-300 focus:bg-white transition-colors text-gray-700 placeholder-rose-200"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 absolute left-4 top-1/2 -translate-y-1/2 text-rose-300 group-focus-within:text-rose-400 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-bold shadow-md shadow-rose-100 transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              搜索
            </button>
          </div>

          {/* 大类目切换（搜索时隐藏） */}
          {!searchQuery.trim() && (
            <div className="flex gap-4">
              {topCategories.map((topCat) => (
                <div
                  key={topCat.id}
                  onMouseEnter={() => setActiveTopCategoryId(topCat.id)}
                  className={`w-[140px] py-2.5 rounded-full cursor-pointer transition-colors duration-200 font-bold text-sm shadow-sm border-2 text-center flex items-center justify-center ${activeTopCategoryId === topCat.id
                    ? 'bg-rose-500 text-white border-rose-500 shadow-rose-200 shadow-[inset_0_0_0_2px_rgba(255,228,230,0.5)]'
                    : 'bg-white text-rose-400 border-rose-100 hover:bg-rose-50 hover:border-rose-200'
                    }`}
                >
                  {topCat.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* 左侧分类列表（搜索时隐藏） - 固定位置设计，仅桌面端显示 */}
      {!searchQuery.trim() && (
        <aside className="hidden lg:block fixed left-[max(1rem,calc((100vw-1280px)/2+1rem))] top-[200px] w-48 z-40">
          <nav
            className="space-y-2 max-h-[calc(100vh-240px)] overflow-y-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {currentCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className="px-3 py-2.5 rounded-xl cursor-pointer transition-colors text-sm font-bold border-2 bg-white text-rose-400 border-rose-50 shadow-sm hover:border-rose-200 hover:text-rose-500 hover:shadow-md hover:bg-rose-50"
              >
                {category.name}
              </div>
            ))}
          </nav>
        </aside>
      )}

      {/* 移动端分类标签栏（水平滚动） */}
      {!searchQuery.trim() && (
        <div className="lg:hidden sticky top-[180px] z-40 bg-[#fffafa]/95 backdrop-blur-sm py-3 px-4 -mx-4 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-2 min-w-max">
            {currentCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className="px-4 py-2 rounded-full text-sm font-bold border-2 bg-white text-rose-400 border-rose-100 shadow-sm whitespace-nowrap hover:bg-rose-50 hover:border-rose-200 active:bg-rose-100"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className={`flex gap-8 items-start ${!searchQuery.trim() ? 'lg:pl-56' : ''}`}>
          {/* 右侧卡片展示区 - 多列布局 */}
          <div className="flex-1">
            {currentLinks.length === 0 ? (
              <div className="bg-white rounded-3xl border-2 border-dashed border-rose-100 p-12 text-center">
                <p className="text-rose-300 font-medium">
                  {searchQuery.trim() ? '未找到相关链接 (｡•́︿•̀｡)' : '该分类下暂无链接'}
                </p>
              </div>
            ) : (
              <div className="space-y-10">
                {searchQuery.trim() && (
                  <div className="mb-4 text-sm font-bold text-rose-400 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-rose-400 rounded-full"></span>
                    找到 {currentLinks.length} 个相关链接
                  </div>
                )}

                {searchQuery.trim() ? (
                  // 搜索模式 - 简单网格布局
                  <div
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                      gridAutoRows: 'min-content',
                    }}
                  >
                    {currentLinks.map((link) => (
                      <LinkCardSmall
                        key={link.id}
                        link={link}
                        onClick={() => setSelectedLink(link)}
                      />
                    ))}
                  </div>
                ) : (
                  // 分类展示模式（显示全部分类）
                  currentCategories
                    .map(category => {
                      const categoryLinks = initialLinks
                        .filter(link => link.categoryId === category.id)
                        .sort((a, b) => a.order - b.order)

                      if (categoryLinks.length === 0) return null

                      return (
                        <section key={category.id} id={`category-${category.id}`} className="space-y-5 scroll-mt-[200px]">
                          <div className="flex items-center gap-4 mb-5">
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className="w-1.5 h-6 bg-rose-500 rounded-full shadow-sm"></span>
                              <h3 className="text-xl font-black text-gray-800 tracking-tight">
                                {category.name}
                              </h3>
                            </div>

                            {/* 分类简介卡片 */}
                            {(category.description || category.name === '掌控魔法') && (
                              <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-rose-100 max-w-2xl">
                                <p className="text-sm text-gray-500 leading-relaxed text-justify">
                                  {category.description || "这里是掌控魔法分类的详细介绍。我们会精选最优质、最稳定的工具，助您轻松跨越数字鸿沟，探索更广阔的互联网世界。"}
                                </p>
                              </div>
                            )}
                          </div>

                          <div
                            className="grid gap-4"
                            style={{
                              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                              gridAutoRows: 'min-content',
                            }}
                          >
                            {categoryLinks.map((link) => (
                              <LinkCardSmall
                                key={link.id}
                                link={link}
                                onClick={() => setSelectedLink(link)}
                              />
                            ))}
                          </div>
                        </section>
                      )
                    })
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 详情模态框 */}
      <LinkDetailModal
        link={selectedLink}
        onClose={() => setSelectedLink(null)}
      />
    </div>
  )
}
