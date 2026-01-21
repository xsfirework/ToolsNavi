import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return NextResponse.json(
      { error: '服务器未配置管理密码' },
      { status: 500 }
    )
  }

  if (password === adminPassword) {
    const cookieStore = await cookies()
    cookieStore.set('admin-auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7天
    })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json(
    { error: '密码错误' },
    { status: 401 }
  )
}
