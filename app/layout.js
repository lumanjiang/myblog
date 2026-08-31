import './globals.css'
import Link from 'next/link'
import siteConfig from '../site.config'

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="shell">
          <header className="site-header">
            <Link href="/" className="brand">
              {siteConfig.title}
            </Link>
            <nav className="nav">
              <Link href="/">首页</Link>
              <Link href="/posts">文章</Link>
              <Link href="/about">关于</Link>
            </nav>
          </header>

          <main>{children}</main>

          <footer className="site-footer">
            <span>
              © {new Date().getFullYear()} {siteConfig.author}
            </span>
            <span className="footer-links">
              {siteConfig.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              ))}
            </span>
          </footer>
        </div>
      </body>
    </html>
  )
}
