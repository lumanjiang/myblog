import Link from 'next/link'
import { getAllPosts, formatDate } from '../lib/posts'
import siteConfig from '../site.config'

export default function Home() {
  const posts = getAllPosts().slice(0, 5)
  const hasMore = getAllPosts().length > 5

  return (
    <>
      <p className="intro">{siteConfig.intro}</p>

      <h2 className="section-label">最新文章</h2>

      {posts.length === 0 ? (
        <p className="empty">还没有文章，去 /admin 写第一篇吧。</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug} className="post-item">
              <Link href={`/posts/${post.slug}`}>
                <h3 className="post-item-title">{post.title}</h3>
                <div className="post-item-meta">{formatDate(post.date)}</div>
                {post.summary && <p className="post-item-summary">{post.summary}</p>}
              </Link>
            </li>
          ))}
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
