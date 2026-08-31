// Decap CMS 登录第二步：拿 GitHub 返回的 code 换 token，再交回给后台页面
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function renderScript(status, payload) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`
  return `<!doctype html>
<html lang="zh-CN">
<head><meta charset="utf-8"><title>登录中…</title></head>
<body style="font-family:system-ui,sans-serif;padding:40px;text-align:center;color:#444">
<p>正在完成登录，请稍候…</p>
<script>
  (function () {
    function send() {
      window.opener && window.opener.postMessage(
        ${JSON.stringify(message)},
        window.location.origin
      );
    }
    window.addEventListener('message', send, { once: true });
    window.opener && window.opener.postMessage('authorizing:github', '*');
    setTimeout(function () { window.close(); }, 1200);
  })();
</script>
</body>
</html>`
}

export async function GET(request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const savedState = request.cookies.get('decap_oauth_state')?.value

  const html = (status, payload) =>
    new NextResponse(renderScript(status, payload), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })

  if (!code) return html('error', { message: '没有拿到 GitHub 授权码' })
  if (!state || state !== savedState)
    return html('error', { message: '登录状态校验失败，请重试' })

  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET

  if (!clientId || !clientSecret)
    return html('error', { message: '服务器缺少 GitHub OAuth 配置' })

  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    })

    const data = await res.json()

    if (data.error || !data.access_token)
      return html('error', { message: data.error_description || '换取 token 失败' })

    return html('success', { token: data.access_token, provider: 'github' })
  } catch (e) {
    return html('error', { message: '网络错误：' + e.message })
  }
}
