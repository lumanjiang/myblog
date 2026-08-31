// Decap CMS 登录第一步：把用户送去 GitHub 授权页面
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const clientId = process.env.GITHUB_CLIENT_ID

  if (!clientId) {
    return new NextResponse(
      '缺少环境变量 GITHUB_CLIENT_ID，请在 Vercel 项目设置里添加后重新部署。',
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    )
  }

  const url = new URL(request.url)
  const origin = process.env.SITE_URL || url.origin
  const state = crypto.randomBytes(16).toString('hex')

  const authUrl = new URL('https://github.com/login/oauth/authorize')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', `${origin}/api/callback`)
  authUrl.searchParams.set('scope', 'repo,user')
  authUrl.searchParams.set('state', state)

  const response = NextResponse.redirect(authUrl.toString())
  response.cookies.set('decap_oauth_state', state, {
    httpOnly: true,
    secure: origin.startsWith('https'),
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  })

  return response
}
