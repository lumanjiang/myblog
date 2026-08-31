import Link from 'next/link'
import { getAllPosts, formatDate } from '../../lib/posts'

export const metadata = {
  title: '全部文章',
}

export default function PostsPage() {
  const posts = getAllPosts()

  return (
    <>
      <h1 className="article-title">全部文章</h1>
      <div className="article-meta" style={{ marginBottom: 32 }}>
        共 {posts.length} 篇
      </div>

      {posts.length === 0 ? (
        <p className="empty">还没有文章。</p>
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
    </>
  )
}
