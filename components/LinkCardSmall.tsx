import type { Link as LinkType } from '@/lib/data'

interface LinkCardSmallProps {
  link: LinkType
  onClick?: () => void
}

// 从 URL 提取域名或短 URL
function getShortUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.replace('www.', '')
    // 如果路径很短，显示完整路径；否则只显示域名
    const pathname = urlObj.pathname
    if (pathname.length > 0 && pathname.length < 30) {
      return `${hostname}${pathname}`
    }
    return hostname
  } catch {
    // 如果不是有效 URL，尝试截断显示
    if (url.length > 40) {
      return url.substring(0, 37) + '...'
    }
    return url
  }
}

// 获取 favicon URL
function getFaviconUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`
  } catch {
    return ''
  }
}

export default function LinkCardSmall({ link, onClick }: LinkCardSmallProps) {
  const shortUrl = getShortUrl(link.url)
  const faviconUrl = link.icon || getFaviconUrl(link.url)

  return (
    <div
      onClick={onClick}
      className="group flex items-center gap-4 px-5 py-4 bg-white rounded-2xl border border-rose-50 hover:border-rose-200 hover:shadow-lg hover:shadow-rose-100/50 transition-all cursor-pointer min-w-0"
    >
      {/* Favicon */}
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-rose-50/30 rounded-xl overflow-hidden border border-rose-100/50">
        {faviconUrl ? (
          <img
            src={faviconUrl}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              // 如果 favicon 加载失败，隐藏图片
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <div className="w-full h-full rounded bg-gray-200" />
        )}
      </div>

      {/* 标题和 URL */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
          {link.title}
        </div>
        <div className="text-xs text-gray-500 truncate mt-0.5">
          {shortUrl}
        </div>
      </div>
    </div>
  )
}
