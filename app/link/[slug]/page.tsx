import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getLinkBySlug, getCategoryBySlug } from '@/lib/data'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const { getLinks } = await import('@/lib/data')
  const links = await getLinks()
  return links.map((link) => ({
    slug: link.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const link = await getLinkBySlug(params.slug)
  if (!link) {
    return {
      title: '链接不存在',
    }
  }
  return {
    title: `${link.title} - ToolsNavi`,
    description: link.description,
    openGraph: {
      title: `${link.title} - ToolsNavi`,
      description: link.description,
      type: 'website',
    },
  }
}

export default async function LinkDetailPage({ params }: { params: { slug: string } }) {
  const link = await getLinkBySlug(params.slug)
  if (!link) {
    notFound()
  }

  const category = await getCategoryBySlug(link.categoryId)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
            ToolsNavi
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{link.title}</h1>

          <div className="mb-8 space-y-4">
            {link.description.split('\n').map((line, index) => (
              <p key={index} className="text-gray-600 text-lg">
                {line}
              </p>
            ))}
          </div>

          {category && (
            <div className="mb-6">
              <Link
                href={`/category/${category.slug}`}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                ← 返回 {category.name} 分类
              </Link>
            </div>
          )}

          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            前往官网
          </a>
        </div>
      </main>
    </div>
  )
}
