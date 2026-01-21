import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ToolsNavi - 链接资源聚合站',
  description: 'ToolsNavi 是一个优雅的链接管理与分享平台，集中展示各类推荐链接与工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="text-gray-900">
        {children}
      </body>
    </html>
  )
}
