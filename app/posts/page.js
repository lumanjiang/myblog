import Link from 'next/link'
import { getAllPosts, formatDate } from '../../lib/posts'

export const metadata = {
  title: '全部文章',
}

const EYEBROW_COLORS = ['c1', 'c3', 'c2', 'c4', 'c5']

export default function PostsPage() {
  const posts = getAllPosts()

  return (
    <>
      <h1 className="article-title" style={{ marginTop: 20 }}>
        全部文章
      </h1>
      <div className="article-meta" style={{ marginBottom: 36 }}>
        共 {posts.length} 篇
      </div>

      {posts.length === 0 ? (
        <p className="empty">还没有文章。</p>
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
    </>
  )
}
