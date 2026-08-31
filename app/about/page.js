import siteConfig from '../../site.config'

export const metadata = {
  title: '关于',
}

export default function AboutPage() {
  return (
    <article>
      <header className="article-header">
        <h1 className="article-title">关于</h1>
      </header>

      <div className="prose">
        <p>{siteConfig.intro}</p>
        <p>
          这个页面的内容在 <code>app/about/page.js</code> 里修改，网站标题、简介、
          社交链接这些在根目录的 <code>site.config.js</code> 里改。
        </p>
        <p>欢迎通过下面的链接找到我：</p>
        <ul>
          {siteConfig.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
