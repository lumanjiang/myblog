import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPostSlugs, formatDate } from '../../../lib/posts'

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return { title: post.title, description: post.summary }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return (
    <article>
      <header className="article-header">
        <h1 className="article-title">{post.title}</h1>
        <div className="article-meta">{formatDate(post.date)}</div>
        {post.tags.length > 0 && (
          <div className="tags">
            {post.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

      <div className="article-nav">
        <Link href="/posts">← 返回文章列表</Link>
      </div>
    </article>
  )
}
