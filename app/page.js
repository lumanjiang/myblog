import Link from 'next/link'
import { getAllPosts, formatDate } from '../lib/posts'
import siteConfig from '../site.config'

const EYEBROW_COLORS = ['c1', 'c3', 'c2', 'c4', 'c5']

export default function Home() {
  const posts = getAllPosts().slice(0, 5)
  const hasMore = getAllPosts().length > 5

  return (
    <>
      <p className="intro serif">{siteConfig.intro}</p>

      <h2 className="section-label">最新文章</h2>

      {posts.length === 0 ? (
        <p className="empty">还没有文章，去 /admin 写第一篇吧。</p>
      ) : (
        <ul className="post-list">
          {posts.map((post, i) => {
            const color = EYEBROW_COLORS[i % EYEBROW_COLORS.length]
            return (
              <li key={post.slug} className="post-item">
                <span className="post-item-index">{String(i + 1).padStart(2, '0')}</span>
                <Link href={`/posts/${post.slug}`}>
                  {post.tags[0] && (
                    <span
                      className="post-item-eyebrow"
                      style={{
                        color: `var(--${color})`,
                        background: `color-mix(in srgb, var(--${color}) 14%, transparent)`,
                      }}
                    >
                      {post.tags[0]}
                    </span>
                  )}
                  <h3 className="post-item-title">{post.title}</h3>
                  <div className="post-item-meta">{formatDate(post.date)}</div>
                  {post.summary && <p className="post-item-summary">{post.summary}</p>}
                </Link>
              </li>
            )
          })}
        </ul>
      )}

      {hasMore && (
        <Link href="/posts" className="more-link">
          查看全部文章 →
        </Link>
      )}
    </>
  )
}
