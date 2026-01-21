'use client'

import { useEffect } from 'react'
import type { Link as LinkType } from '@/lib/data'

interface LinkDetailModalProps {
  link: LinkType | null
  onClose: () => void
}

export default function LinkDetailModal({ link, onClose }: LinkDetailModalProps) {
  useEffect(() => {
    if (link) {
      // 阻止背景滚动
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [link])

  if (!link) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* 关闭按钮 */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 第一块：名称 */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{link.title}</h2>
          </div>

          {/* 第二块：简介 */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">简介</h3>
            <p className="text-gray-600 whitespace-pre-line">{link.description}</p>
          </div>

          {/* 第三块：教程链接 + 申请链接 */}
          <div className="flex flex-col sm:flex-row gap-4">
            {link.tutorialUrl && (
              <a
                href={link.tutorialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
              >
                教程链接
              </a>
            )}
            {link.applyUrl && (
              <a
                href={link.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
              >
                申请链接
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
